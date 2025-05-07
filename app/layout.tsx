import React from "react";
import type { Metadata } from "next/types";
import "../styles/App.css";
import "../styles/Colors.css";
import "../styles/CircularVis.css";
import "../styles/CircularSettings.css";
import "../styles/ChordNameDisplay.css";
import "../styles/KeyboardBase.css";
import "../styles/KeyboardCircular.css";
import "../styles/KeyboardLinear.css";
import "../styles/MusicalKeySelector.css";
import "../styles/TransposeWidget.css";
import "../styles/Staff.css";
import "../styles/PresetsSelector.css";
import "../styles/InputModeSelector.css";

export const metadata: Metadata = {
  title: "Chromatic Circle",
  description: "Interactive musical keyboard visualization",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  ); /* jklas;df*/
}
