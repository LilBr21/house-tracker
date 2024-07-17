"use client";
import { Box, Typography, Button, Modal, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { deleteTask } from "@/app/lib/actions/taskActions";
import { customTheme } from "../theme";

interface IProps {
  taskId: string;
  householdId: string;
  isDeleteModalOpen: boolean;
  handleDeleteModalClose: () => void;
  fetchHouseholdData: () => Promise<void>;
}

export const DeleteTaskModal = ({
  taskId,
  householdId,
  isDeleteModalOpen,
  handleDeleteModalClose,
  fetchHouseholdData,
}: IProps) => {
  const handleDeleteTask = async () => {
    try {
      await deleteTask(householdId, taskId);
      await fetchHouseholdData();
      handleDeleteModalClose();
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={handleDeleteModalClose}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "560px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: `${customTheme.colors.backgroundSecondary}`,
            padding: "64px 24px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => handleDeleteModalClose()}
            sx={{
              position: "absolute",
              right: "8px",
              top: "8px",
              color: `${customTheme.colors.textPrimary}`,
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <Typography textAlign="center" color={customTheme.colors.textPrimary}>
            Are you sure you want to delete this task?
          </Typography>
          <Button
            sx={{ width: "120px", marginTop: "24px" }}
            color="error"
            onClick={handleDeleteTask}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
