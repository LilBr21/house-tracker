"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button, Box, Typography } from "@mui/material";
import { customTheme } from "@/app/ui/theme";
import { isSignedIn, logOut } from "@/app/lib/actions/authActions";

export const TopBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authButtonText, setAuthButtonText] = useState("");
  const router = useRouter();
  const pathName = usePathname();

  const isOnLoginPage = pathName === "/login";

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isSignedIn();
      setIsAuthenticated(authenticated);
    };
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateAuthButtonText = () => {
    if (isAuthenticated) {
      return "Log out";
    } else if (isOnLoginPage) {
      return "Sign up";
    } else {
      return "Log in";
    }
  };

  const handleAuthButtonClick = (buttonName: string) => {
    switch (buttonName) {
      case "Log in":
        router.push("/login");
        break;
      case "Sign up":
        router.push("/signup");
        break;
      case "Log out":
        logOut();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setAuthButtonText(generateAuthButtonText());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, isAuthenticated]);

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
      <Typography variant="h5">House tracker</Typography>
      <div>
        {isAuthenticated && (
          <>
            <Button color="primary">Tasks</Button>
            <Button color="primary">Summary</Button>
            <Link href="/settings">
              <Button color="primary">Settings</Button>
            </Link>
          </>
        )}
        <Button
          color="primary"
          onClick={() => handleAuthButtonClick(authButtonText)}
        >
          {authButtonText}
        </Button>
      </div>
    </Box>
  );
};
