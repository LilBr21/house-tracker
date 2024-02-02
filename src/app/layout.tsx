import StyledComponentsRegistry from "./lib/registery";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Layout } from "./ui/layout/Layout";
import { theme } from "./ui/theme";
import { TopBar } from "./components/top-bar/TopBar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <StyledComponentsRegistry>
        <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <Layout>
                <TopBar />
                {children}
              </Layout>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
