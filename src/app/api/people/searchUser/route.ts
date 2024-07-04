import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { searchInput } = body;

        const list = await prisma.tweekUser.findMany({
            where : {
                OR : [
                    { 
                        firstName : {
                            contains : searchInput,
                            mode: 'insensitive'
                        }
                    },
                    { 
                        lastName : {
                            contains : searchInput,
                            mode: 'insensitive'
                        }
                    },
                    { 
                        userName : {
                            contains : searchInput,
                            mode: 'insensitive'
                        }
                    },
                ]
            },
            select : {
                email : true,
                firstName : true,
                lastName : true,
                userName : true,
            }
        });

        return NextResponse.json({success : true,  list }, { status : 200 });

    } catch (error) {
        console.error("No users found : ", error);
        return NextResponse.json(
          { error: "Internal Server error" },
          { status: 500 }
        );
    }
}