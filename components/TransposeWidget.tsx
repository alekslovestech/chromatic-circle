"use client";

import React from "react";
import { useMusical } from "../contexts/MusicalContext";

const TransposeWidget: React.FC = () => {
  const { selectedIndices, setSelectedIndices } = useMusical();

  const handleTranspose = (steps: number) => {
    const newIndices = selectedIndices.map((index) => (index + steps + 12) % 12);
    setSelectedIndices(newIndices);
  };

  return (
    <div className="transpose-widget">
      <button onClick={() => handleTranspose(-1)}>-1</button>
      <button onClick={() => handleTranspose(1)}>+1</button>
    </div>
  );
};

export default TransposeWidget;
