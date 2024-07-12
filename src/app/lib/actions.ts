'use server';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { signIn, auth, signOut } from '../../../auth';
import { v4 as uuidv4 } from 'uuid';

export const loginAuthenticate = async (prevState: string | undefined, formData: FormData) => {
      try {
        const response = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          callbackUrl: "/",
          redirect: true,
          redirectTo: "/",
        });
      } catch (error) {
        if (isRedirectError(error)) {
          throw error;
      }
      }
};

export const signupAuthenticate = async (prevState: string | undefined, formData: FormData) => {
      try {
        const response = await fetch(`${process.env.APP_URL}/api/register`, {
          method: "POST",
          body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        });
        if (response.ok) {
          const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            callbackUrl: "/",
            redirect: true,
            redirectTo: "/",
          });
        }
      } catch (error) {
        if (isRedirectError(error)) {
          throw error;
      }
      }
};

export const getHousehold = async (id: string) => {
  try {
    const response = await fetch(`${process.env.APP_URL}/api/household/?id=${id}`);
    const household = await response.json();
    return household;
  } catch (e) {
    console.log(e);
  }
};

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



export const getUser = async () => {
  try {
    const session = await auth();
    const email = session?.user?.email;
    const response = await fetch(`${process.env.APP_URL}/api/users/?email=${email}`, {
      method: "GET",
    });
    const user = await response.json();
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const editUserName = async (name: string, email: string) => {
  try {
    const response = await fetch(`${process.env.APP_URL}/api/users`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    }
  } catch (e) {
    console.log(e);
  }

}

export const isSignedIn = async () => {
  const session = await auth();
  if (session?.user) {
    return true;
  } else {
    return false;
  }
}

export const logOut = async () => {
  await signOut({ redirect: true, redirectTo: "/login" });
};
