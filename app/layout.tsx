import React from "react";
import type { Metadata } from "next/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chromatic Circle",
  description: "Interactive musical keyboard visualization",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-body">{children}</body>
    </html>
  );
}
