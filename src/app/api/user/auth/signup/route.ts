import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { error } from "console";
import { string } from "zod";
const prisma = new PrismaClient();

export async function POST(request : NextRequest){
    try {
        const body = await request.json();
        const { email, userName, firstName, lastName, password } = body;

        if(!email || !userName || !firstName || !lastName || !password){
            return NextResponse.json({error: "All fields are required"}, { status : 400 });
        }

        const existingUser = await prisma.tweekUser.findFirst({
            where : {
                email
            }
        });

        if(existingUser){
            return NextResponse.json({error : "User already registered"}, { status : 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.tweekUser.create({
            data : {
                email,
                userName,
                firstName,
                lastName,
                password : hashedPassword,
                joinedDate : new Date(),
                bio : '',
            }
        });

        return NextResponse.json({success : true}, { status: 201 });
        
    } catch (error) {
        console.error("Error creating user: ", error);
        return NextResponse.json({error : "Internal Server error"}, { status: 500 });
    } finally{
        await prisma.$disconnect();
    }
};