import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userName, password } = body;

    if (!userName || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await prisma.tweekUser.findFirst({
      where: {
        userName,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Not a user, please sign up" },
        { status: 400 }
      );
    }

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
        bio : user.bio,
        userProfile : user.userProfile
      },
      { status: 201 }
    );

    response.cookies.set("tweek_token", token, { httpOnly: true });

    return response;
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
