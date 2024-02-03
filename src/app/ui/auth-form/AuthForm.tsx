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
import { Heading, HeadingSize } from "../heading/Heading";
import { customTheme } from "../theme";

interface AuthFormProps {
  title: string;
  buttonText: string;
}

export const AuthForm = ({ title, buttonText }: AuthFormProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log(response);
  };

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
      <form onSubmit={handleSubmit}>
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
