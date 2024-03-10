import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const email = url.searchParams.get('email');
        
        if (!email) {
            return NextResponse.json({ message: 'Email parameter is required' }, { status: 400 });
        }
        
        const response = await sql`SELECT * FROM users WHERE email = ${email}`;
        
        return NextResponse.json(response.rows);
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}

