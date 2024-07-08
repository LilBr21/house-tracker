import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

interface ITask {
    name: string;
    notes: string;
    assignee: string;
    due_to: Date;
    done: boolean;
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const { name, notes, assignee, due_to, done } = await request.json();

    // Construct the new task object
    const newTask: ITask = {
      name: name,
      notes: notes,
      assignee: assignee,
      due_to: due_to,
      done: done
    };

    // Fetch the existing household data
    const existingHousehold = await sql`
      SELECT * FROM household WHERE id = ${id}`;
    
    // Parse the existing tasks array
    let existingTasks: ITask[] = [];
    if (existingHousehold.rows[0].tasks) {
      existingTasks = existingHousehold.rows[0].tasks;
    }

    // Append the new task to the existing tasks array
    const updatedTasks: ITask[] = [...existingTasks, newTask];

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
    return NextResponse.json({ message: 'Error adding task' }, { status: 500 });
  }
}

