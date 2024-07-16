import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create new post
export async function POST(request:NextRequest) {
    try {

        const {email} = await getDataFromToken(request);
        if(!email){
            return NextResponse.json({ error : "Missing Token | Please Login first"}, { status : 400 });
        }

        const body = await request.json();
        const { content } = body;
        if(!content){
            return NextResponse.json({ error : "Please fill your tweek box to make a post "}, { status : 400 });
        }

        await prisma.tweek.create({
            data : {
                content,
                userId : email
            },
        });

        return NextResponse.json({ success : true }, { status : 200 });
        
    } catch (error) {
        console.error("Error saving new post : ", error);
        return NextResponse.json(
          { error: "Internal Server error" },
          { status: 500 }
        );
    } finally{
        await prisma.$disconnect();
    }
};


// get all posts belongs to user
export async function GET(request:NextRequest) {

    try {
        const searchParams = request.nextUrl.searchParams;
        const auth_user = searchParams.get('auth_user');
        const email = searchParams.get('email');


        if(!email) {
            return NextResponse.json({ error : "Email is missing", success : false }, { status : 404 });
        }

        const details = await prisma.tweekUser.findUnique({
            where : {
                email
            },
            select : {
                firstName : true,
                lastName : true,
                userName : true,
                bio : true,
                email : true,
                joinedDate : true
            }
        });

        const tweeks = await prisma.tweek.findMany({
            where : {
                userId : email
            },
            include : {
                tweekUser : {
                    select : {
                        userName: true,
                        firstName: true,
                        lastName: true,
                        userProfile : true
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
        })
            
        return NextResponse.json({ success : true, tweeks, details }, { status : 200 });
        
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