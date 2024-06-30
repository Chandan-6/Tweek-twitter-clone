import { NextRequest, NextResponse } from "next/server";
import { formatDate } from "@/lib/formatDate";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        const user = await prisma.tweekUser.findUnique({
            where: {
                email
            },
            select: {
                joinedDate: true
            }
        });
        console.log(user?.joinedDate, typeof(user?.joinedDate));

        if (user?.joinedDate) {
            let parsedDate = formatDate(user.joinedDate);
            return NextResponse.json({ success: true, parsedDate }, { status: 200 });
        } else {
            console.log("Joined date is undefined");
            return NextResponse.json({ success: false, error: "Joined date is undefined" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching joining Date: ", error);
        return NextResponse.json(
            { error: "Internal Server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
