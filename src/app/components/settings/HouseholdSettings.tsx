"use client";
import { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Card } from "@/app/ui/card/Card";
import { theme } from "@/app/ui/theme";
import { useGetHousehold } from "@/app/hooks/useGetHousehold";
import { useGetUser } from "@/app/hooks/useGetUser";
import { IHousehold } from "@/app/interfaces/households";
import { HouseholdEditModal } from "@/app/ui/modals/HouseholdModal";

export const HouseholdSettings = () => {
  const [household, setHousehold] = useState<null | IHousehold>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleModalClose = (isSubmitted?: boolean) => {
    if (isSubmitted) {
      fetchHousehold();
    }
    setIsModalOpen(false);
  };

  const pendingTasks = household?.tasks?.filter((task) => !task.done);

  return (
    <Card width="100%">
      <HouseholdEditModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        householdId={household?.id ?? ""}
        householdName={household?.name ?? ""}
      />
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography color={theme.palette.primary.dark}>
            Name: {household?.name}
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
        <Box sx={{ height: "34px", display: "flex", alignItems: "center" }}>
          <Typography color={theme.palette.primary.dark}>
            Pending tasks: {pendingTasks?.length ?? 0}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
