"use client";
import { useState, useEffect, use } from "react";
import { Box, Typography } from "@mui/material";
import { IUser } from "@/app/interfaces/users";
import { useGetUser } from "@/app/hooks/useGetUser";
import { Card } from "@/app/ui/card/Card";
import { theme } from "@/app/ui/theme";

export const UserSettings = () => {
  const [user, setUser] = useState<null | IUser>(null);

  const { fetchUserData } = useGetUser();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        console.log("userData", userData);
      } catch (e) {
        console.log(e);
      }
    };

    getUserData();
  }, []);

  return (
    <Card>
      <Typography
        color={theme.palette.primary.dark}
        variant="h6"
        textAlign="center"
      >
        User settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        <Box>
          <Typography color={theme.palette.primary.dark}>
            Name: {user?.name}
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.primary.dark}>
            Email: {user?.email}
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.primary.dark}>
            Household: {user?.households}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
