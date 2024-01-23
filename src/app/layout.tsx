import StyledComponentsRegistry from "./lib/registery";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <StyledComponentsRegistry>
        <body>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
