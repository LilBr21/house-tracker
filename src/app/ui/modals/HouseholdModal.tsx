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
import { updateHousehold } from "@/app/lib/actions/householdActions";
import { customTheme } from "../theme";

interface IProps {
  handleModalClose: (isSubmitted?: boolean) => void;
  isModalOpen: boolean;
  householdId: string;
  householdName: string;
}

export const HouseholdEditModal = ({
  handleModalClose,
  isModalOpen,
  householdId,
  householdName,
}: IProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string; // Get name as string
    try {
      await updateHousehold(householdId, name); // Pass name directly
      handleModalClose(true);
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => handleModalClose()}
      sx={{ top: "20%", padding: "0 120px" }}
    >
      <Box
        sx={{
          backgroundColor: `${customTheme.colors.backgroundSecondary}`,
          padding: "36px 24px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
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
          Enter new household name
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
                htmlFor="householdName"
                sx={{
                  color: `${customTheme.colors.textPrimary}`,
                  marginBottom: "8px",
                }}
              >
                Household name
              </InputLabel>
              <Input
                id="householdName"
                type="text"
                name="name"
                defaultValue={householdName}
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Modal>
  );
};
