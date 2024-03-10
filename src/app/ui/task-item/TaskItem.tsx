"use client";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";
import { customTheme } from "../theme";
import { ITask } from "@/app/interfaces/task";

interface IProps {
  task: ITask;
  index: number;
}

export const TaskItem = ({ task, index }: IProps) => {
  const formattedDate = format(new Date(task.due_to), "dd/MM/yyyy");

  return (
    <Box
      sx={{
        display: "flex",
        gap: "24px",
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
      <Typography>
        {index.toString()}. {task.name}
      </Typography>
      <Typography>assignee: {task.assignee}</Typography>
      <Typography>due to: {formattedDate} </Typography>
      {task.notes && <Typography>notes: {task.notes}</Typography>}
    </Box>
  );
};
