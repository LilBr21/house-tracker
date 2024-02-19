import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    const householdId = uuidv4();
    try {
        const { email, password } = await request.json();
        const hashedPassword = await hash(password, 10);
        await sql`INSERT INTO household (id, name, members) VALUES (${householdId}, ${householdId}, ARRAY[${email}]::VARCHAR[])`;
        const response = await sql`INSERT INTO users (email, password, households, name) VALUES (${email}, ${hashedPassword}, ${householdId}, ${email})`;
    } catch (e) {
        console.log(e);
    }
    return NextResponse.json({ message: 'success' });
}