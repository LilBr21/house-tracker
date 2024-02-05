"use client";
import { FormEvent } from "react";
import {
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { authenticate } from "@/app/lib/actions";
import { Heading, HeadingSize } from "../../ui/heading/Heading";
import { customTheme } from "../../ui/theme";

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
      <Heading $size={HeadingSize.Large}>{title}</Heading>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          authenticate(actionType, new FormData(e.currentTarget))
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
