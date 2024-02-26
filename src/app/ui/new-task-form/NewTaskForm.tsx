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
import { IHousehold } from "@/app/interfaces/households";
import { customTheme } from "../../ui/theme";

interface IProps {
  handleTaskModalClose: () => void;
  isTaskModalOpen: boolean;
  household: IHousehold;
}

export const NewTaskForm = ({
  handleTaskModalClose,
  isTaskModalOpen,
  household,
}: IProps) => {
  const [taskAsignee, setTaskAsignee] = useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log("event.target.value", event.target.value);
    setTaskAsignee(event.target.value as string);
  };

  return (
    <Modal
      open={isTaskModalOpen}
      onClose={handleTaskModalClose}
      sx={{ top: "30%", padding: "0 120px" }}
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
          Add new task
        </Typography>
        <form>
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
              <Input id="taskName" type="text" />
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
                onChange={handleSelectChange}
                value={taskAsignee ?? ""}
                sx={{ color: "white", padding: "0 12px" }}
              >
                {household.members.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ color: `${customTheme.colors.textPrimary}` }}>
              <TextField
                placeholder="Notes"
                multiline
                minRows={3}
                inputProps={{ style: { color: "white" } }}
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Add task
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  );
};
