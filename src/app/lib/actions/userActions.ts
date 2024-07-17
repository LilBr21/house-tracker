"use server"
import { auth } from '../../../../auth';

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