"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { KeyboardCircular } from "./Keyboard/Circular/KeyboardCircular";
import { CircularSettings } from "./Keyboard/Circular/CircularSettings";
import { KeyboardLinear } from "./Keyboard/Linear/KeyboardLinear";
import SettingsContainer from "./Settings/SettingsContainer";
import StaffRenderer from "./StaffRenderer";
import { GlobalMode, useGlobal } from "../contexts/GlobalContext";

const AppContent: React.FC = () => {
  const borderStyle = { border: `1px solid var(--debug-border-color)` };
  const { globalMode, setGlobalMode } = useGlobal();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  React.useEffect(() => {
    if (mode === "advanced") {
      setGlobalMode(GlobalMode.Advanced);
    } else {
      setGlobalMode(GlobalMode.Default);
    }
  }, [mode, setGlobalMode]);

  return (
    <div className="grid-container">
      <div className="keyboardlinear-container" style={borderStyle}>
        <KeyboardLinear />
      </div>
      <div className="keyboardcircular-container" style={borderStyle}>
        <KeyboardCircular />
        <CircularSettings />
      </div>
      <SettingsContainer />
      <StaffRenderer />
    </div>
  );
};

export default AppContent;
