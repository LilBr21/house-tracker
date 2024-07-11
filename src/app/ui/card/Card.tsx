import { Box } from "@mui/material";
import { customTheme } from "@/app/ui/theme";

interface IProps {
  children: React.ReactNode;
  isDone?: boolean;
}

export const Card = ({ children, isDone }: IProps) => {
  return (
    <Box
      sx={{
        width: "400px",
        padding: "12px",
        backgroundColor: `${customTheme.colors.backgroundInverted}`,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: isDone ? 0.5 : 0.9,
      }}
    >
      {children}
    </Box>
  );
};
