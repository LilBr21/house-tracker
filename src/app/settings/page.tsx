import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { UserSettings } from "../components/settings/UserSettings";
import { HouseholdSettings } from "../components/settings/HouseholdSettings";
import settingsBg from "../assets/settings_bg.svg";

export default async function SettingsPage() {
  return (
    <Box>
      <Box sx={{ position: "absolute", bottom: "0", right: "0" }}>
        <Image
          alt="background decorative image with household theme"
          src={settingsBg}
          width={600}
          height={600}
          objectFit="cover"
          quality={100}
        />
      </Box>
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
    </Box>
  );
}
