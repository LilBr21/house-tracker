import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Id parameter is required' }, { status: 400 });
    }

    const response= await sql`SELECT * FROM household WHERE id=${id}`;
    return NextResponse.json(response.rows);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Error fetching household' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const { name } = await request.json();

    const response = await sql`
      UPDATE household
      SET name = ${name}
      WHERE id = ${id}
      RETURNING *`;
    

    return NextResponse.json(response.rows[0]);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Error updating household' }, { status: 500 });
  }
}
