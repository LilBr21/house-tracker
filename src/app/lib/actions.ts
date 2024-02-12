'use server';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { signIn } from '../../../auth';

export const loginAuthenticate = async (prevState: string | undefined, formData: FormData) => {
      try {
        const response = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          callbackUrl: "/",
          redirect: true,
          redirectTo: "/",
        });
        console.log({ response });
      } catch (error) {
        if (isRedirectError(error)) {
          throw error;
      }
      }
};

export const signupAuthenticate = async (prevState: string | undefined, formData: FormData) => {
  console.log('authenticating', prevState, formData.get("email"), formData.get("password"));
  if (prevState !== undefined) {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        });
      } catch (error) {
        console.log({ error });
        console.error('Failed to sign up:', error);
        throw error;
      }
    }
};
