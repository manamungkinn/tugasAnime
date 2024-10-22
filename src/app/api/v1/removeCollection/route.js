import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const data = await request.json(); // karna ppk ini bikin pusing
    const { id } = data;
    // Lakukan penghapusan menggunakan Prisma
    // const findUser = await prisma.collection.findFirst({
    //   where: {
    //     id: id,
    //   },
    // });
    // console.log({findUser})
    const deleteUser = await prisma.collection.delete({
      where: {
        id: id,
      },
    });

    console.log(deleteUser)

    if (!deleteUser) {
      return  NextResponse.json({ status: 500, isRemoved: false }, { status: 500 });
    }

    return NextResponse.json({ status: 200, isCreated: true }, { status: 200 });
  } catch (error) {
    console.error("Prisma error:", error);
    NextResponse.json({ status: 500, message: "Server error", error: error.message }, { status: 500 });
    // return new Response(JSON.stringify({ status: 500, message: "Server error", error: error.message }), { status: 500 });
  }
}