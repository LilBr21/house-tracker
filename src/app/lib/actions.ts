'use server';
import { signIn } from '../../../auth';
import { ActionType } from '../ui/auth-form/AuthForm';

export const authenticate = async (actionType: ActionType, formData: FormData) => {
    if (actionType === ActionType.Login) {
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: true,
        redirectTo: "/",
      });
      console.log(response);
    }
    if (actionType === ActionType.Register) {
      // const formData = new FormData(e.currentTarget);
      console.log(formData);
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      console.log(response);
    }
  };