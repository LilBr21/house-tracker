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
