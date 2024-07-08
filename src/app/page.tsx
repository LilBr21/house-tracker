import { Box } from "@mui/material";
import { CurrentTasks } from "./components/current-tasks/CurrentTasks";

export default function Home() {
  return (
    <Box sx={{ maxHeight: "calc(100% - 73px)" }}>
      <CurrentTasks />
    </Box>
  );
}
