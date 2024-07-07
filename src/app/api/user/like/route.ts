import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { tweekID } = body;
    const { email } = getDataFromToken(request);

    await prisma.$transaction(async (prisma) => {
      const existingLike = await prisma.like.findUnique({
        where: {
          liker_tweekID: {
            liker: email,
            tweekID: tweekID,
          },
        },
      });

      if (!existingLike) {
        await prisma.like.create({
          data: {
            liker: email,
            tweekID: tweekID,
          },
        });
      } else {
        await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error liking/unliking a post ❤️ : ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
