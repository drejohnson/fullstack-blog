import "./globals.css";
import type { Metadata } from "next";
import { Epilogue } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${epilogue.className} bg-white dark:bg-black min-h-[100dvh]`}
      >
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
