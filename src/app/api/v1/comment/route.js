import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const { anime_mal_id, user_email, comment, user_name, user_image, date } = await request.json();
    const data = { anime_mal_id, user_email, comment, user_name, user_image, date };
    console.log(data);
    const createComment = await prisma.comment.create({ data });

    if (!createComment) {
      return Response.json({ status: 500, isCreated: false });
    } else {
      return NextResponse.json({ status: 200, isCreated: true });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error", error: error.message }), { status: 500 };
  }
}
