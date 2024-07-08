'use server';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { signIn, auth, signOut } from '../../../auth';

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
