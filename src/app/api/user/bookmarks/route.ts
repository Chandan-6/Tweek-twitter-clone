import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST : Create a new bookmark

export async function POST(request: NextRequest) {
    try {

        const { email } = await getDataFromToken(request);
        
        if(!email){
            return NextResponse.json({ error : "Missing Token | Please Login first"}, { status : 400 });
        }

        const body = await request.json();
        const { tweekID } = body;
        await prisma.bookmarks.create({
            data : {
                userId : email,
                bookmarkedTweekId : tweekID
            }
        });

        return NextResponse.json({ success : true }, { status : 200 });

    } catch (error) {
        console.error("Error in creating a book-mark : ", error);
        return NextResponse.json(
            { error : "Internal server error" },
            { status : 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}


// GET : bookmarks
export async function GET(request:NextRequest) {
    try {
        const { email } = await getDataFromToken(request);

        const allBookmarks = await prisma.bookmarks.findMany({
            where: {
                userId: email
            },
            include: {
                tweek: {
                    include: {
                        tweekUser: {
                            select: {
                                userName: true,
                                firstName: true,
                                lastName: true
                            }
                        },
                        likes : {
                            select : {
                                id : true,
                                liker : true,
                                tweekID : true
                            }
                        }
                    }
                }
            }
        });
        return NextResponse.json({ success : true, bookmarks : allBookmarks }, { status : 200 })
    }catch (error) {
        console.error("Error in fetching bookmarks : ", error);
        return NextResponse.json(
          { error: "Internal Server error" },
          { status: 500 }
        );
    } finally{
        await prisma.$disconnect();
    }
}