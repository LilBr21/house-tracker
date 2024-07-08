"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Box, Grid, Typography, Checkbox } from "@mui/material";
import { customTheme } from "../theme";
import { ITask } from "@/app/interfaces/task";

interface IProps {
  task: ITask;
  index: number;
}

export const TaskItem = ({ task, index }: IProps) => {
  const [isDone, setIsDone] = useState(task.done ?? false);

  const formattedDate = format(new Date(task.due_to), "dd/MM/yyyy");

  const handleDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.target.checked);
  };

  const taskNum = index + 1;
  return (
    <Grid
      container
      sx={{
        width: "100%",
        borderTopStyle: "solid", // Separate border properties
        borderTopWidth: "1px",
        borderTopColor: `${customTheme.colors.textSecondary}`,
        borderBottomStyle: "solid", // Separate border properties
        borderBottompWidth: "1px",
        borderBottomColor: `${customTheme.colors.textSecondary}`,
        padding: "12px 0",
      }}
    >
      <Grid item xs={10}>
        <Typography
          variant={"h6"}
          sx={{ textDecoration: isDone ? "line-through" : "" }}
        >
          {taskNum.toString()}. {task.name}
        </Typography>
        <Typography>assignee: {task.assignee}</Typography>
        <Typography>due to: {formattedDate} </Typography>
        {task.notes && <Typography>notes: {task.notes}</Typography>}
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Done:</Typography>
          <Checkbox checked={isDone} onChange={handleDoneChange} />
        </Box>
      </Grid>
    </Grid>
  );
};
