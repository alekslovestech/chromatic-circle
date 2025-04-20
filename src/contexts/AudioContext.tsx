import React, { createContext, useContext, useCallback, useState, ReactNode } from "react";
import * as Tone from "tone";

interface AudioContextType {
  initializeAudio: () => Promise<void>;
  isAudioInitialized: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  const initializeAudio = useCallback(async () => {
    if (isAudioInitialized) return;

    try {
      if (Tone.getContext().state !== "running") {
        await Tone.start();
        console.log("Tone.js context started");
        setIsAudioInitialized(true);
      } else {
        setIsAudioInitialized(true);
      }
    } catch (error) {
      console.error("Failed to start Tone.js context:", error);
    }
  }, [isAudioInitialized]);

  return (
    <AudioContext.Provider value={{ initializeAudio, isAudioInitialized }}>
      {children}
    </AudioContext.Provider>
  );
};
