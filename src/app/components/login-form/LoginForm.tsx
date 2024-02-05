"use client";
import { AuthForm, ActionType } from "@/app/ui/auth-form/AuthForm";

export const LoginForm = () => {
  return (
    <AuthForm
      title="Log in to your account"
      buttonText="Log in"
      actionType={ActionType.Login}
    />
  );
};
