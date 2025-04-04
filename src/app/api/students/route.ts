import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const student = await prisma.student.create({
      data,
    });
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating student" }, { status: 500 });
  }
}
