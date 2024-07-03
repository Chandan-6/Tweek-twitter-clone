import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// get all posts belongs to user
export async function GET(request:NextRequest) {
    try {
        const tweeks = await prisma.tweek.findMany({
            include : {
                tweekUser : {
                    select : {
                        userName: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });

        // console.log("all tweeks: ", tweeks);
        return NextResponse.json({ success : true, tweeks }, { status : 200 });
        
    } catch (error) {
        console.error("Error in fetching tweeks/posts : ", error);
        return NextResponse.json(
          { error: "Internal Server error" },
          { status: 500 }
        );
    } finally{
        await prisma.$disconnect();
    }
}