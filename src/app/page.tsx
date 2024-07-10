import Image from "next/image";
import { Box } from "@mui/material";
import { CurrentTasks } from "./components/current-tasks/CurrentTasks";
import dogWalk from "./assets/dog-walk.svg";

export default function Home() {
  return (
    <Box sx={{ maxHeight: "calc(100% - 73px)" }}>
      <Box sx={{ position: "absolute", bottom: "0", right: "0" }}>
        <Image
          alt="Dog walking"
          src={dogWalk}
          width={600}
          height={600}
          objectFit="cover"
          quality={100}
        />
      </Box>
      <CurrentTasks />
    </Box>
  );
}
