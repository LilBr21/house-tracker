"use client";
import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import {
  loginAuthenticate,
  signupAuthenticate,
} from "@/app/lib/actions/authActions";
import { customTheme } from "../../ui/theme";
import { useFormState } from "react-dom";

export enum ActionType {
  Login = "login",
  Register = "register",
}

interface AuthFormProps {
  title: string;
  buttonText: string;
  actionType: ActionType;
}

export const AuthForm = ({ title, buttonText, actionType }: AuthFormProps) => {
  const [loginErrorMessage, loginDispatch] = useFormState<any, FormData>(
    loginAuthenticate,
    undefined
  );

  const [signupErrorMessage, signupDispatch] = useFormState<any, FormData>(
    signupAuthenticate,
    undefined
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <form
        action={
          actionType === ActionType.Login ? loginDispatch : signupDispatch
        }
      >
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "400px",
            padding: "64px",
          }}
        >
          <FormControl>
            <InputLabel
              sx={{ color: `${customTheme.colors.textPrimary}` }}
              htmlFor="email"
            >
              Email
            </InputLabel>
            <Input
              sx={{
                backgroundColor: `${customTheme.colors.backgroundSecondary}`,
                padding: "12px",
                color: `${customTheme.colors.textPrimary}`,
                borderRadius: "4px",
              }}
              id="email"
              type="email"
              placeholder="Email address"
              name="email"
            />
          </FormControl>
          <FormControl>
            <InputLabel
              sx={{ color: `${customTheme.colors.textPrimary}` }}
              htmlFor="password"
            >
              Password
            </InputLabel>
            <Input
              sx={{
                backgroundColor: `${customTheme.colors.backgroundSecondary}`,
                padding: "12px",
                color: `${customTheme.colors.textPrimary}`,
                borderRadius: "4px",
              }}
              id="password"
              type="password"
              placeholder="Password"
              name="password"
            />
          </FormControl>
          <Button type="submit">{buttonText}</Button>
        </FormGroup>
      </form>
    </Box>
  );
};
