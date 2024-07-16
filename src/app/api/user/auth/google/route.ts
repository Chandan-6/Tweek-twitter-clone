import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, password, email } = body;

    let userName = email;
    // check if user is registered with email or not

    const user = await prisma.tweekUser.findFirst({
      where: {
        userName,
      },
    });

    if (!user) {

      console.log("Creating a user 🆕🗽");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.tweekUser.create({
        data: {
          email,
          userName,
          firstName: name,
          lastName: '',
          password: hashedPassword,
          joinedDate: new Date(),
          bio: 'State about you here...'
        }
      });

      const tokenPayload = {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
      };

      const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json(
        {
          success: true,
          email: newUser.email,
          userName: newUser.userName,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          bio: newUser.bio,
        },
        { status: 201 }
      );

      response.cookies.set("tweek_token", token, { httpOnly: true });

      return response;

    }
    
    // if user
    else {

      console.log("Already an registerd user 👤👍");

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
      }

      const tokenPayload = {
        id: user.id,
        userName: user.userName,
        email: user.email,
      };

      const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });

      const response = NextResponse.json(
        {
          success: true,
          email: user.email,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
        },
        { status: 201 }
      );

      response.cookies.set("tweek_token", token, { httpOnly: true });

      return response;
    }


  } catch (error) {
      console.error("Error creating user: ", error);
      return NextResponse.json(
        { error: "Internal Server error" },
        { status: 500 }
      );
  } finally {
      await prisma.$disconnect();
  }
}
