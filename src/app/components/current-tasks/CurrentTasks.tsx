"use client";
import { Box } from "@mui/material";
import { Heading, HeadingSize } from "@/app/ui/heading/Heading";
import { useEffect, useState } from "react";
import { getUser, getHousehold } from "@/app/lib/actions";
import { IUser } from "@/app/interfaces/users";
import { IHousehold } from "@/app/interfaces/households";

export const CurrentTasks = () => {
  const [user, setUser] = useState<null | IUser>(null);
  const [households, setHouseholds] = useState<null | IHousehold[]>(null);

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

  if (!user || !households) {
    // Render loading state while user data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Heading $size={HeadingSize.Medium}>Current Tasks</Heading>
      {/* Render your component content here using the fetched user data */}
    </Box>
  );
};
