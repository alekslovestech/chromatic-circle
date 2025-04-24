import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as Tone from "tone";
import { ActualIndex } from "../types/IndexTypes";
import { useMusical } from "./MusicalContext";
import { ixScaleDegreeIndex } from "../types/GreekModes/ScaleDegreeType";
import { ixActualArray } from "../types/IndexTypes";
import { KeyTextMode } from "../types/SettingModes";
import { IndexUtils } from "../utils/IndexUtils";

interface AudioContextType {
  initializeAudio: () => Promise<void>;
  isAudioInitialized: boolean;
  // Scale preview functionality
  isPlaying: boolean;
  currentPlayingIndex: ActualIndex | null;
  startPreview: (keyTextMode: KeyTextMode) => void;
  stopPreview: () => void;
  togglePreview: (keyTextMode: KeyTextMode) => void;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<ActualIndex | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Get the current musical key and setSelectedNoteIndices from the MusicalContext
  const { selectedMusicalKey, setSelectedNoteIndices } = useMusical();

  // Update selectedNoteIndices when currentPlayingIndex changes
  useEffect(() => {
    if (currentPlayingIndex !== null) {
      setSelectedNoteIndices(ixActualArray([currentPlayingIndex]));
    }
  }, [currentPlayingIndex, setSelectedNoteIndices]);

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

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const startPreview = (keyTextMode: KeyTextMode) => {
    if (isPlaying) return;

    setIsPlaying(true);
    let scaleDegreeIndex = 0;
    const isRomanMode = keyTextMode === KeyTextMode.Roman;

    const id = setInterval(
      () => {
        if (scaleDegreeIndex < selectedMusicalKey.scalePatternLength) {
          const playedOffsets = selectedMusicalKey.getOffsets(
            ixScaleDegreeIndex(scaleDegreeIndex),
            isRomanMode,
          );
          const noteIndices = playedOffsets.map((offset) => selectedMusicalKey.tonicIndex + offset);
          const sanitizedNoteIndices = ixActualArray(
            IndexUtils.fitChordToAbsoluteRange(noteIndices),
          );
          setSelectedNoteIndices(sanitizedNoteIndices);
          scaleDegreeIndex++;
        } else {
          setSelectedNoteIndices(ixActualArray([selectedMusicalKey.tonicIndex]));
          stopPreview();
        }
      },
      keyTextMode === KeyTextMode.Roman ? 500 : 250,
    );

    setIntervalId(id);
  };

  const stopPreview = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setIsPlaying(false);
    setCurrentPlayingIndex(null);
  };

  const togglePreview = (keyTextMode: KeyTextMode) => {
    if (isPlaying) {
      stopPreview();
    } else {
      startPreview(keyTextMode);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        initializeAudio,
        isAudioInitialized,
        isPlaying,
        currentPlayingIndex,
        startPreview,
        stopPreview,
        togglePreview,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
