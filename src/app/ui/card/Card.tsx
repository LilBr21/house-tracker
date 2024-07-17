import { Box } from "@mui/material";
import { customTheme } from "@/app/ui/theme";

interface IProps {
  children: React.ReactNode;
  isDone?: boolean;
  width?: string;
  justifyContent?: string;
}

export const Card = ({
  children,
  isDone,
  width = "400px",
  justifyContent = "space-between",
}: IProps) => {
  return (
    <Box
      sx={{
        width: `${width}`,
        padding: "12px",
        backgroundColor: `${customTheme.colors.backgroundInverted}`,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: `${justifyContent}`,
        opacity: isDone ? 0.5 : 0.9,
      }}
    >
      {children}
    </Box>
  );
};
