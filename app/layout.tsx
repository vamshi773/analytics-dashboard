import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Analytics Dashboard",
    template: "%s | Analytics Dashboard",
  },
  description: "Real-time admin analytics dashboard built with Next.js",
  applicationName: "Analytics Dashboard",
  keywords: ["Next.js", "Dashboard", "Analytics", "Admin", "Real-time", "Charts"],
  authors: [{ name: "Sandeep Jukuri" }],
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
