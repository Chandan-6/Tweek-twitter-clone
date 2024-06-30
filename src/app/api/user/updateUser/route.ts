import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getDataFromToken } from "@/helpers/getDataFromToken";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userName, firstName, lastName, bio } = body;
    const email = await getDataFromToken(request);

    const user = await prisma.tweekUser.update({
      where: {
        email,
      },
      data: {
        userName,
        firstName,
        lastName,
        bio,
      },
      select: {
        userName: true,
        firstName: true,
        lastName: true,
        bio: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in updating user : ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );

  } finally {
    await prisma.$disconnect();
  }
}
