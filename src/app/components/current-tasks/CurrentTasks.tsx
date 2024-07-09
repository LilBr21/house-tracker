"use client";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser, getHousehold } from "@/app/lib/actions";
import { IUser } from "@/app/interfaces/users";
import { IHousehold } from "@/app/interfaces/households";
import { NewTaskForm } from "@/app/ui/modals/NewTaskForm";
import { TaskItem } from "@/app/ui/task-item/TaskItem";

export const CurrentTasks = () => {
  const [user, setUser] = useState<null | IUser>(null);
  const [household, setHousehold] = useState<null | IHousehold>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  console.log(household);

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

  const handleTaskModalClose = (isSubmitted?: boolean) => {
    setIsTaskModalOpen(false);
    if (isSubmitted) {
      fetchHouseholdData();
    }
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
    fetchHouseholdData();
  }, [user]);

  const hasTasks = household?.tasks;

  if (!user || !household) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "12px 20px",
        margin: "64px 64px",
        borderRadius: "8px",
        height: "calc(100vh - 260px)",
      }}
    >
      <NewTaskForm
        handleTaskModalClose={handleTaskModalClose}
        isTaskModalOpen={isTaskModalOpen}
        household={household}
      />
      <Typography variant="h6" textAlign="center">
        Current Tasks
      </Typography>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        {hasTasks ? (
          <Grid
            container
            columnGap={12}
            rowGap={8}
            sx={{
              width: "100%",
              height: "90%",
            }}
          >
            {household.tasks &&
              household.tasks.map((task, index) => (
                <TaskItem
                  key={index}
                  index={index}
                  task={task}
                  householdId={household.id}
                  fetchHouseholdData={fetchHouseholdData}
                />
              ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Typography>There are no tasks in you household yet.</Typography>
          </Box>
        )}
      </Box>
      <Button variant="contained" onClick={() => setIsTaskModalOpen(true)}>
        Add new task
      </Button>
    </Box>
  );
};
