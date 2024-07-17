"use client";
import { useState, useEffect, use } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IUser } from "@/app/interfaces/users";
import { useGetUser } from "@/app/hooks/useGetUser";
import { Card } from "@/app/ui/card/Card";
import { theme } from "@/app/ui/theme";
import { NameEditModal } from "@/app/ui/modals/NameEditModal";

export const UserSettings = () => {
  const [user, setUser] = useState<null | IUser>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fetchUserData } = useGetUser();

  const getUserData = async () => {
    try {
      const userData = await fetchUserData();
      setUser(userData);
      console.log("userData", userData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleModalClose = (isSubmitted?: boolean) => {
    if (isSubmitted) {
      getUserData();
    }
    setIsModalOpen(false);
  };

  return (
    <Card width="100%" justifyContent="flex-start">
      <NameEditModal
        handleModalClose={handleModalClose}
        isModalOpen={isModalOpen}
        userEmail={user?.email ?? ""}
        userName={user?.name ?? ""}
      />
      <Typography
        color={theme.palette.primary.dark}
        variant="h6"
        textAlign="center"
      >
        User
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "8px",
          padding: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography color={theme.palette.primary.dark}>
            Name: {user?.name}
          </Typography>
          <IconButton
            size="small"
            sx={{ paddingRight: "8px" }}
            color="secondary"
            onClick={() => setIsModalOpen(true)}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Box>
        <Box sx={{ height: "34px", display: "flex", alignItems: "center" }}>
          <Typography color={theme.palette.primary.dark}>
            Email: {user?.email}
          </Typography>
        </Box>
        <Box sx={{ height: "34px", display: "flex", alignItems: "center" }}>
          <Typography color={theme.palette.primary.dark}>
            Households: {user?.households}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
