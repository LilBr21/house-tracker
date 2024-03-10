"use client";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser, getHousehold } from "@/app/lib/actions";
import { IUser } from "@/app/interfaces/users";
import { IHousehold } from "@/app/interfaces/households";
import { NewTaskForm } from "@/app/ui/new-task-form/NewTaskForm";
import { customTheme } from "@/app/ui/theme";

export const CurrentTasks = () => {
  const [user, setUser] = useState<null | IUser>(null);
  const [household, setHousehold] = useState<null | IHousehold>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  console.log(household);

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser[0]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchHouseholdData = async () => {
      try {
        if (user) {
          const households = await getHousehold(user.households);
          setHousehold(households[0]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchHouseholdData();
  }, [user]);

  const hasTasks = household?.tasks;

  if (!user || !household) {
    // Render loading state while user data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: `${customTheme.colors.backgroundSecondary}`,
        padding: "12px 20px",
        margin: "64px 240px",
        borderRadius: "8px",
      }}
    >
      <NewTaskForm
        handleTaskModalClose={handleTaskModalClose}
        isTaskModalOpen={isTaskModalOpen}
        household={household}
      />
      <Typography variant="h6">Current Tasks</Typography>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasTasks ? (
          <Box>
            <p>Your tasks</p>
            <Button
              variant="contained"
              onClick={() => setIsTaskModalOpen(true)}
            >
              Add new task
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Typography>There are no tasks in you household yet.</Typography>
            <Button
              variant="contained"
              onClick={() => setIsTaskModalOpen(true)}
            >
              Add new task
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
