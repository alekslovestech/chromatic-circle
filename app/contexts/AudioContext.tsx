"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as Tone from "tone";

interface AudioContextType {
  isInitialized: boolean;
  setAudioInitialized: (value: boolean) => void;
  playNote: (frequency: number) => void;
  stopNote: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setAudioInitialized] = useState(false);
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  useEffect(() => {
    if (isInitialized && !synth) {
      const newSynth = new Tone.Synth().toDestination();
      setSynth(newSynth);
    }
  }, [isInitialized, synth]);

  const playNote = (frequency: number) => {
    if (synth && isInitialized) {
      synth.triggerAttackRelease(frequency, "8n");
    }
  };

  const stopNote = () => {
    if (synth && isInitialized) {
      synth.triggerRelease();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isInitialized,
        setAudioInitialized,
        playNote,
        stopNote,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
