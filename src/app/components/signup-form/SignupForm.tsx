"use client";
import { AuthForm, ActionType } from "@/app/ui/auth-form/AuthForm";

export const SignupForm = () => {
  return (
    <AuthForm
      title="Sign up to start using House tracker"
      buttonText="Sign up"
      actionType={ActionType.Register}
    />
  );
};
