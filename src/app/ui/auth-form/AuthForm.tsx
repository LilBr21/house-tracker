"use client";
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
          />
        </FormControl>
        <Button type="submit">{buttonText}</Button>
      </FormGroup>
    </Box>
  );
};
