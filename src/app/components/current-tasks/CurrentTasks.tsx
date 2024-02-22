"use client";
import {
  Box,
  Typography,
  Button,
  Modal,
  FormGroup,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUser, getHousehold } from "@/app/lib/actions";
import { IUser } from "@/app/interfaces/users";
import { IHousehold } from "@/app/interfaces/households";
import { customTheme } from "@/app/ui/theme";

export const CurrentTasks = () => {
  const [user, setUser] = useState<null | IUser>(null);
  const [households, setHouseholds] = useState<null | IHousehold[]>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUser = await getUser();
        console.log("fetchedUser", fetchedUser[0]);
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
          const household = await getHousehold(user.households);
          console.log("household", household);
          setHouseholds(household);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchHouseholdData();
  }, [user]);

  const hasTasks = households?.some(
    (household) => household.tasks && household.tasks.length > 0
  );

  if (!user || !households) {
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
      <Modal
        open={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        sx={{ top: "30%", padding: "0 120px" }}
      >
        <Box>
          <Typography color="white">Add new task</Typography>
          <form>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="taskName">Task name</InputLabel>
                <Input id="taskName" type="text" />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="taskDescription">
                  Task description
                </InputLabel>
                <Input id="taskDescription" type="text" />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="taskDueDate">Due date</InputLabel>
                <Input id="taskDueDate" type="date" />
              </FormControl>
              <Button variant="contained" type="submit">
                Add task
              </Button>
            </FormGroup>
          </form>
        </Box>
      </Modal>
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
