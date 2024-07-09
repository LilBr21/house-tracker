"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Box, Grid, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { customTheme, theme } from "../theme";
import { ITask } from "@/app/interfaces/task";
import { DeleteTaskModal } from "@/app/ui/modals/DeleteTaskModal";

interface IProps {
  task: ITask;
  index: number;
  householdId: string;
  fetchHouseholdData: () => Promise<void>;
}

export const TaskItem = ({
  task,
  index,
  householdId,
  fetchHouseholdData,
}: IProps) => {
  const [isDone, setIsDone] = useState(task.done ?? false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formattedDate = format(new Date(task.due_to), "dd/MM/yyyy");

  const handleDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.target.checked);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const taskNum = index + 1;
  return (
    <Grid
      container
      sx={{
        width: "400px",
        padding: "12px",
        backgroundColor: `${customTheme.colors.backgroundInverted}`,
        borderRadius: "8px",
      }}
    >
      <DeleteTaskModal
        taskId={task.id}
        householdId={householdId}
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        fetchHouseholdData={fetchHouseholdData}
      />
      <Grid item xs={10}>
        <Typography
          color={theme.palette.primary.dark}
          variant={"h6"}
          sx={{ textDecoration: isDone ? "line-through" : "" }}
        >
          {taskNum.toString()}. {task.name}
        </Typography>
        <Typography color={theme.palette.primary.dark}>
          assignee: {task.assignee}
        </Typography>
        <Typography color={theme.palette.primary.dark}>
          due to: {formattedDate}{" "}
        </Typography>
        {task.notes && (
          <Typography color={theme.palette.primary.dark}>
            notes: {task.notes}
          </Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        <Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <IconButton
              sx={{ paddingRight: "8px" }}
              color="secondary"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography color={theme.palette.primary.dark}>Done:</Typography>
            <Checkbox checked={isDone} onChange={handleDoneChange} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
