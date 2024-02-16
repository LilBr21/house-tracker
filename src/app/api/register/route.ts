import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const hashedPassword = await hash(password, 10);
        const response = await sql`INSERT INTO users (email, password, households, name) VALUES (${email}, ${hashedPassword}, ${uuidv4()}, ${email})`;
    } catch (e) {
        console.log(e);
    }
    return NextResponse.json({ message: 'success' });
}