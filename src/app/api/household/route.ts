import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(id: string) {
  try {
    const household = await sql`SELECT * FROM household WHERE id=${id}`;
    return NextResponse.json(household.rows);
  } catch (e) {
    console.log(e);
  }
}