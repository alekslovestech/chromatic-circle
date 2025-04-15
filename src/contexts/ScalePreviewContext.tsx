// src/contexts/ScalePreviewContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { ActualIndex } from "../types/IndexTypes";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { useMusical } from "./MusicalContext";

interface ScalePreviewContextType {
  isPlaying: boolean;
  currentPlayingIndex: ActualIndex | null;
  startPreview: () => void;
  stopPreview: () => void;
  togglePreview: () => void;
}

const ScalePreviewContext = createContext<ScalePreviewContextType | undefined>(undefined);

export const ScalePreviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<ActualIndex | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Get the current musical key from the MusicalContext
  const { selectedMusicalKey } = useMusical();

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const startPreview = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    setCurrentPlayingIndex(0 as ActualIndex);

    const id = setInterval(() => {
      setCurrentPlayingIndex((prevIndex) => {
        if (prevIndex === null) return 0 as ActualIndex;

        // Get the next index in the scale
        const nextIndex = getNextScaleIndex(prevIndex, selectedMusicalKey);
        return nextIndex;
      });
    }, 500); // Adjust timing as needed

    setIntervalId(id);
  };

  const stopPreview = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setIsPlaying(false);
    setCurrentPlayingIndex(null);
  };

  const togglePreview = () => {
    if (isPlaying) {
      stopPreview();
    } else {
      startPreview();
    }
  };

  return (
    <ScalePreviewContext.Provider
      value={{
        isPlaying,
        currentPlayingIndex,
        startPreview,
        stopPreview,
        togglePreview,
      }}
    >
      {children}
    </ScalePreviewContext.Provider>
  );
};

export const useScalePreview = () => {
  const context = useContext(ScalePreviewContext);
  if (context === undefined) {
    throw new Error("useScalePreview must be used within a ScalePreviewProvider");
  }
  return context;
};

// Helper function to get the next index in the scale
function getNextScaleIndex(currentIndex: ActualIndex, musicalKey: MusicalKey): ActualIndex {
  // Implementation depends on your scale structure
  // This is just a placeholder
  return 0 as ActualIndex;
}
