import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ITask } from "@/app/interfaces/task";

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const { task_id } = await request.json();

    // Fetch the existing household data
    const existingHousehold = await sql`
      SELECT * FROM household WHERE id = ${id}`;
    
    // Parse the existing tasks array
    let existingTasks: ITask[] = [];
    if (existingHousehold.rows[0].tasks) {
      existingTasks = existingHousehold.rows[0].tasks;
    }

    // Append the new task to the existing tasks array
    const updatedTasks: ITask[] = existingTasks.filter(task => task.id !== task_id);

    // Serialize the updated tasks array to JSON string
    const updatedTasksJson = JSON.stringify(updatedTasks);

    // Update the household tasks array
    const response = await sql`
      UPDATE household 
      SET tasks = ${updatedTasksJson}
      WHERE id = ${id} 
      RETURNING *`;

    return NextResponse.json(response.rows[0]);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Error deleting task' }, { status: 500 });
  }
}
