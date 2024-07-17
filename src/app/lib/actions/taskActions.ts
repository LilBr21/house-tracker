'use server';
import { v4 as uuidv4 } from 'uuid';

export const addTask = async (prevState: string | undefined, formData: FormData) => {
    try {
      const response = await fetch(`${process.env.APP_URL}/api/tasks/?id=${formData.get('id')}`, {
        method: "PUT",
        body: JSON.stringify({
          name: formData.get("name"),
          notes: formData.get("notes"),
          assignee: formData.get("assignee"),
          due_to: formData.get("due_to"),
          done: false,
          task_id: uuidv4(),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const household = await response.json();
        return household;
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const deleteTask = async (id: string, task_id: string) => {
    try {
      const response = await fetch(`${process.env.APP_URL}/api/delete-task/?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({
          task_id: task_id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const household = await response.json();
        return household;
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const updateTask = async (id: string, task_id: string, updates: { [key: string]: any }) => {
    try {
      const response = await fetch(`${process.env.APP_URL}/api/update-task/?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({
          task_id: task_id,
          ...updates
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const household = await response.json();
        return household;
      } else {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (e) {
      console.error('Error updating task:', e);
    }
  };