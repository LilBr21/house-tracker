"use client";
import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import { Card } from "@/app/ui/card/Card";
import { theme } from "@/app/ui/theme";
import { useGetHousehold } from "@/app/hooks/useGetHousehold";
import { useGetUser } from "@/app/hooks/useGetUser";
import { IHousehold } from "@/app/interfaces/households";

export const HouseholdSettings = () => {
  const [household, setHousehold] = useState<null | IHousehold>(null);

  const { fetchUserData } = useGetUser();
  const { fetchHouseholdData } = useGetHousehold();

  const fetchHousehold = async () => {
    try {
      const user = await fetchUserData();
      const householdData = await fetchHouseholdData(user);
      console.log("householdData", householdData);
      setHousehold(householdData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHousehold();
  }, []);

  const pendingTasks = household?.tasks?.filter((task) => !task.done);

  return (
    <Card width="100%">
      <Typography
        color={theme.palette.primary.dark}
        variant="h6"
        textAlign="center"
      >
        Household
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
        <Box>
          <Typography color={theme.palette.primary.dark}>
            Name: {household?.name}
          </Typography>
        </Box>
        <Box>
          <Typography color={theme.palette.primary.dark}>Members:</Typography>
          <List>
            {household?.members.map((member, index) => (
              <ListItem key={`${member}_${index}`}>
                <Typography color={theme.palette.primary.dark}>
                  {member}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Typography color={theme.palette.primary.dark}>
            Pending tasks: {pendingTasks?.length ?? 0}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
