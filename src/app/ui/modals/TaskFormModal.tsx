"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Select,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { useFormState } from "react-dom";
import { IHousehold } from "@/app/interfaces/households";
import { ITask } from "@/app/interfaces/task";
import { addTask, updateTask } from "@/app/lib/actions";
import { customTheme } from "../theme";

interface IProps {
  handleTaskModalClose: (isSubmitted?: boolean) => void;
  isTaskModalOpen: boolean;
  household: IHousehold;
  isEditing?: boolean;
  task?: ITask;
}

export const TaskFormModal = ({
  handleTaskModalClose,
  isTaskModalOpen,
  household,
  isEditing = false,
  task,
}: IProps) => {
  const [errorMessage, dispatch] = useFormState<any, FormData>(
    addTask,
    undefined
  );
  const [taskAssignee, setTaskAssignee] = useState(task?.assignee ?? "");
  const [taskHousehold, setTaskHousehold] = useState(
    household.name ?? household.id
  );

  const handleSelectAsigneeChange = (event: SelectChangeEvent) => {
    setTaskAssignee(event.target.value as string);
  };

  const handleSelectHouseholdChange = (event: SelectChangeEvent) => {
    setTaskHousehold(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      if (isEditing && task?.id) {
        await updateTask(household.id, task.id, {
          name: formData.get("name"),
          notes: formData.get("notes"),
          assignee: formData.get("assignee"),
          due_to: formData.get("due_to"),
        });
        handleTaskModalClose(true);
        return;
      }
      await dispatch(formData);
      handleTaskModalClose(true);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Modal
      open={isTaskModalOpen}
      onClose={() => handleTaskModalClose()}
      sx={{ top: "20%", padding: "0 120px" }}
    >
      <Box
        sx={{
          backgroundColor: `${customTheme.colors.backgroundSecondary}`,
          padding: "24px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography
          color="white"
          variant="h6"
          sx={{ marginBottom: "24px", textAlign: "center" }}
        >
          {isEditing ? "Edit task" : "Add new task"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              color: `${customTheme.colors.textPrimary}`,
            }}
          >
            <FormControl>
              <InputLabel
                htmlFor="taskName"
                sx={{
                  color: `${customTheme.colors.textPrimary}`,
                  marginBottom: "8px",
                }}
              >
                Task name
              </InputLabel>
              <Input
                id="taskName"
                type="text"
                name="name"
                defaultValue={task?.name ?? ""}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{ color: `${customTheme.colors.textPrimary}` }}
              >
                Due to:
              </FormHelperText>
              <Input
                sx={{ color: "white", padding: "0 12px" }}
                id="taskDueDate"
                placeholder="Due to"
                type="date"
                name="due_to"
                defaultValue={task?.due_to ?? Date.now()}
              />
            </FormControl>
            <FormControl>
              <InputLabel
                htmlFor="taskAssignee"
                sx={{ color: `${customTheme.colors.textPrimary}` }}
              >
                Assignee
              </InputLabel>
              <Select
                id="taskAssignee"
                variant="standard"
                onChange={handleSelectAsigneeChange}
                value={taskAssignee ?? ""}
                sx={{ color: "white", padding: "0 12px" }}
                name="assignee"
              >
                {household.members.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel
                htmlFor="id"
                sx={{ color: `${customTheme.colors.textPrimary}` }}
              >
                Household
              </InputLabel>
              <Select
                id="householdId"
                variant="standard"
                onChange={handleSelectHouseholdChange}
                value={taskHousehold ?? ""}
                sx={{ color: "white", padding: "0 12px" }}
                name="id"
              >
                <option key={household.id} value={household.id}>
                  {household.name ?? household.id}
                </option>
              </Select>
            </FormControl>
            <FormControl sx={{ color: `${customTheme.colors.textPrimary}` }}>
              <TextField
                placeholder="Notes"
                multiline
                minRows={3}
                inputProps={{ style: { color: "white" } }}
                name="notes"
                defaultValue={task?.notes ?? ""}
              />
            </FormControl>
            <Button variant="contained" type="submit">
              {isEditing ? "Save" : "Add task"}
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  );
};
