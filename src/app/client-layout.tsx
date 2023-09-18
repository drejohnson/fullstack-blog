"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// This layout component can be used with React state, context and more as it is a client component.
export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
      <Toaster />
    </>
  );
};
