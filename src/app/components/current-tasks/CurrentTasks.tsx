"use client";
import { Box } from "@mui/material";
import { Heading, HeadingSize } from "@/app/ui/heading/Heading";
import { useEffect, useState } from "react";
import { getUser } from "@/app/lib/actions";

export const CurrentTasks = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser();
      console.log("fetchedUser", fetchedUser);
      setUser(fetchedUser);
    };

    fetchData();
  }, []);

  if (!user) {
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
