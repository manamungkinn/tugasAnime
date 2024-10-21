import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { anime_mal_id, user_email, anime_image, anime_title } = await request.json();
    const data = { anime_mal_id, user_email, anime_image, anime_title };

    const createCollection = await prisma.collection.create({ data });

    if (!createCollection) {
      return NextResponse.json({ status: 500, isCreated: false }, { status: 500 });
    } else {
      return NextResponse.json({ status: 200, isCreated: true }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error", error: error.message }, { status: 500 });
  }
}
