import Image from "next/image";
import styles from "./page.module.css";
import { Counter } from "./_component/Counter";
import { Users } from "./_component/Users";
import { AgeComponent } from "./_component/AgeComponent";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box margin="100px 300px 300px 300px"
      justifyContent={"center"}>
      <Typography>
        <h2>Zustand Re-render issue</h2>
      </Typography>

      <Box
        display="flex"

        gap={4}


      >
        <Users />
        <AgeComponent />
      </Box>

    </Box>

  );
}
