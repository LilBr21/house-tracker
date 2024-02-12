"use client";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { customTheme } from "@/app/ui/theme";
import { Heading, HeadingSize } from "@/app/ui/heading/Heading";
import { isSignedIn, logOut } from "@/app/lib/actions";

export const TopBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isSignedIn();
      setIsAuthenticated(authenticated);
    };
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 24px",
        borderBottom: `1px solid ${customTheme.colors.backgroundSecondary}`,
      }}
    >
      <Heading $size={HeadingSize.Large}>House tracker</Heading>
      <div>
        <Button color="primary">Tasks</Button>
        <Button color="primary">Summary</Button>
        <Button color="primary">Settings</Button>
        <Button color="primary" onClick={() => logOut()}>
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </div>
    </Box>
  );
};
