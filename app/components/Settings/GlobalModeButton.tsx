"use client";

import React from "react";
import { GlobalMode, useGlobal } from "../../contexts/GlobalContext";
import { useRouter } from "next/navigation";

export const GlobalModeButton: React.FC = () => {
  const { globalMode, setGlobalMode } = useGlobal();
  const router = useRouter();

  const handleModeSwitch = () => {
    const oppositeMode =
      globalMode === GlobalMode.Default ? GlobalMode.Advanced : GlobalMode.Default;
    setGlobalMode(oppositeMode);

    // Update URL and navigate
    if (oppositeMode === GlobalMode.Default) {
      router.push("/default");
    } else {
      router.push("/advanced");
    }
  };

  return (
    <button className="clear-button" onClick={handleModeSwitch}>
      {globalMode === GlobalMode.Default ? "Switch to Scale Preview Mode" : "Switch to Basic Mode"}
    </button>
  );
};
