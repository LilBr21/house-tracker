"use client";
import {
  Box,
  Typography,
  Button,
  Modal,
  FormGroup,
  FormControl,
  Input,
  InputLabel,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { editUserName } from "@/app/lib/actions/userActions";
import { customTheme } from "../theme";

interface IProps {
  handleModalClose: (isSubmitted?: boolean) => void;
  isModalOpen: boolean;
  userEmail: string;
  userName: string;
}

export const NameEditModal = ({
  handleModalClose,
  isModalOpen,
  userEmail,
  userName,
}: IProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string; // Get name as string
    try {
      await editUserName(name, userEmail); // Pass name directly
      handleModalClose(true);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => handleModalClose()}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: `${customTheme.colors.backgroundSecondary}`,
          padding: "36px 24px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "50%",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => handleModalClose()}
          sx={{
            position: "absolute",
            right: "8px",
            top: "8px",
            color: `${customTheme.colors.textPrimary}`,
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
        <Typography
          color="white"
          variant="h6"
          sx={{ marginBottom: "24px", textAlign: "center" }}
        >
          Enter new user name
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
                htmlFor="userName"
                sx={{
                  color: `${customTheme.colors.textPrimary}`,
                  marginBottom: "8px",
                  opacity: 0.8,
                }}
              >
                User name
              </InputLabel>
              <Input
                id="userName"
                type="text"
                name="name"
                defaultValue={userName}
                sx={{ color: `${customTheme.colors.textPrimary}` }}
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              sx={{ "&:hover": { color: `${customTheme.colors.textPrimary}` } }}
            >
              Save
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  );
};
