"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Box, Typography, Checkbox, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { theme } from "../theme";
import { ITask } from "@/app/interfaces/task";
import { IHousehold } from "@/app/interfaces/households";
import { DeleteTaskModal } from "@/app/ui/modals/DeleteTaskModal";
import { TaskFormModal } from "../modals/TaskFormModal";
import { updateTask } from "@/app/lib/actions";
import { Card } from "../card/Card";

interface IProps {
  task: ITask;
  index: number;
  household: IHousehold;
  fetchHouseholdData: () => Promise<void>;
}

export const TaskItem = ({
  task,
  index,
  household,
  fetchHouseholdData,
}: IProps) => {
  const [isDone, setIsDone] = useState(task.done ?? false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const formattedDate = format(new Date(task.due_to), "dd/MM/yyyy");

  const handleDoneChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsDone(event.target.checked);
    try {
      await updateTask(household.id, task.id, { done: event.target.checked });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleTaskModalClose = (isSubmitted?: boolean) => {
    if (isSubmitted) {
      fetchHouseholdData();
    }
    setIsTaskModalOpen(false);
  };

  const taskNum = index + 1;
  return (
    <Card isDone={isDone}>
      <DeleteTaskModal
        taskId={task.id}
        householdId={household.id}
        isDeleteModalOpen={isDeleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        fetchHouseholdData={fetchHouseholdData}
      />
      <TaskFormModal
        handleTaskModalClose={handleTaskModalClose}
        isTaskModalOpen={isTaskModalOpen}
        household={household}
        isEditing={true}
        task={task}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color={theme.palette.primary.dark}>Done:</Typography>
          <Checkbox
            checked={isDone}
            color="success"
            onChange={handleDoneChange}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            sx={{ paddingRight: "8px" }}
            color="secondary"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{ paddingRight: "8px" }}
            color="secondary"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
