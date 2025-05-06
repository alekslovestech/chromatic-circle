"use client";

import React from "react";
import { useMusical } from "../contexts/MusicalContext";

const ChordNameDisplay: React.FC = () => {
  const { selectedIndices } = useMusical();

  const getChordName = (): string => {
    if (selectedIndices.length === 0) return "";
    if (selectedIndices.length === 1) return "Single Note";
    if (selectedIndices.length === 2) return "Interval";
    if (selectedIndices.length === 3) return "Triad";
    return "Chord";
  };

  return (
    <div className="chord-display">
      <h3>{getChordName()}</h3>
    </div>
  );
};

export default ChordNameDisplay;
