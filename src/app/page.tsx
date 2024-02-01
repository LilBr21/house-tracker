import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./ui/theme";
import { Layout } from "./ui/layout/Layout";
import { TopBar } from "./components/top-bar/TopBar";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <TopBar />
      </Layout>
    </ThemeProvider>
  );
}
