import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ITask } from "@/app/interfaces/task";

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const { task_id, ...updatedFields } = await request.json();

    // Fetch the existing household data
    const existingHousehold = await sql`
      SELECT * FROM household WHERE id = ${id}`;
    
    // Parse the existing tasks array
    let existingTasks: ITask[] = [];
    if (existingHousehold.rows[0].tasks) {
      existingTasks = existingHousehold.rows[0].tasks;
    }

    // Find the task to update
    const taskIndex = existingTasks.findIndex(task => task.id === task_id);
    if (taskIndex === -1) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Update the task with new fields
    existingTasks[taskIndex] = {
      ...existingTasks[taskIndex],
      ...updatedFields
    };

    // Serialize the updated tasks array to JSON string
    const updatedTasksJson = JSON.stringify(existingTasks);

    // Update the household tasks array
    const response = await sql`
      UPDATE household 
      SET tasks = ${updatedTasksJson}
      WHERE id = ${id} 
      RETURNING *`;

    return NextResponse.json(response.rows[0]);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Error updating task' }, { status: 500 });
  }
}
