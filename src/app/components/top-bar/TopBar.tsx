"use client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { customTheme } from "@/app/ui/theme";
import { Heading, HeadingSize } from "@/app/ui/heading/Heading";

export const TopBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 24px",
        borderBottom: `1px solid ${customTheme.colors.backgroundSecondary}`,
      }}
    >
      <Heading $size={HeadingSize.Large}>House tracker</Heading>
      <div>
        <Button color="primary">Tasks</Button>
        <Button color="primary">Summary</Button>
        <Button color="primary">Settings</Button>
      </div>
    </Box>
  );
};
