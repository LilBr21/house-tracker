import StyledComponentsRegistry from "./lib/registery";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
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
            {children}
          </AppRouterCacheProvider>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
