import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
}