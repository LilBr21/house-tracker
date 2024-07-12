import { Box, Typography } from "@mui/material";
import { UserSettings } from "../components/settings/UserSettings";
import { HouseholdSettings } from "../components/settings/HouseholdSettings";

export default async function SettingsPage() {
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
      <Typography variant="h5" textAlign="center">
        Settings
      </Typography>
      <Box
        sx={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        <UserSettings />
        <HouseholdSettings />
      </Box>
    </Box>
  );
}
