import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

interface ITask {
    name: string;
    notes: string;
    assignee: string;
    due_to: Date;
}

export async function PUT(request: Request) {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      const { name, notes, assignee, due_to } = await request.json();
  
      // Construct the new task object
      const newTask: ITask = {
        name: name,
        notes: notes,
        assignee: assignee,
        due_to: due_to
      };
  
      // Fetch the existing household data
      const existingHousehold = await sql`
        SELECT * FROM household WHERE id = ${id}`;
      
      // Parse the existing tasks array
      const existingTasks: ITask[] = JSON.parse(existingHousehold.rows[0].tasks || '[]');
      
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
  
      console.log('response', response);
      return NextResponse.json(response.rows);
    } catch (e) {
      console.log(e);
      return NextResponse.json({ message: 'Error adding task' }, { status: 500 });
    }
}
