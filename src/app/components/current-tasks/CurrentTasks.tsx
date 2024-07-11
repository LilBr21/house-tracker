"use client";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { IUser } from "@/app/interfaces/users";
import { IHousehold } from "@/app/interfaces/households";
import { TaskFormModal } from "@/app/ui/modals/TaskFormModal";
import { TaskItem } from "@/app/ui/task-item/TaskItem";
import { useGetUser } from "@/app/hooks/useGetUser";
import { useGetHousehold } from "@/app/hooks/useGetHousehold";

export const CurrentTasks = () => {
  const [user, setUser] = useState<null | IUser>(null);
  const [household, setHousehold] = useState<null | IHousehold>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { fetchUserData } = useGetUser();
  const { fetchHouseholdData } = useGetHousehold();
  console.log(household);

  const getHouseHold = async () => {
    try {
      if (user) {
        const data = await fetchHouseholdData(user);
        setHousehold(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleTaskModalClose = (isSubmitted?: boolean) => {
    setIsTaskModalOpen(false);
    if (isSubmitted) {
      getHouseHold();
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    getHouseHold();
  }, [user]);

  const hasTasks = household?.tasks;

  if (!user || !household) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        padding: "12px 20px",
        margin: "40px 64px",
        borderRadius: "8px",
        height: "calc(100vh - 260px)",
        zIndex: "1",
      }}
    >
      <TaskFormModal
        handleTaskModalClose={handleTaskModalClose}
        isTaskModalOpen={isTaskModalOpen}
        household={household}
      />
      <Typography variant="h5" textAlign="center">
        Current Tasks
      </Typography>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          marginBottom: "16px",
        }}
      >
        {hasTasks ? (
          <Grid
            container
            columnGap={8}
            rowGap={4}
            sx={{
              width: "100%",
              height: "90%",
            }}
          >
            {household.tasks &&
              household.tasks
                .filter((task) => task.done !== true)
                .map((task, index) => (
                  <TaskItem
                    key={index}
                    index={index}
                    task={task}
                    household={household}
                    fetchHouseholdData={getHouseHold}
                  />
                ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Typography>There are no tasks in you household yet.</Typography>
          </Box>
        )}
      </Box>
      <Button
        variant="outlined"
        sx={{ width: "40%" }}
        onClick={() => setIsTaskModalOpen(true)}
      >
        Add new task
      </Button>
    </Box>
  );
};
