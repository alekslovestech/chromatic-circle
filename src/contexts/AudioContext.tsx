import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import { KeyDisplayMode } from "../types/SettingModes";
import { useMusical } from "./MusicalContext";
import { ActualIndex } from "../types/IndexTypes";
import { ixScaleDegreeIndex, ScaleDegreeIndex } from "../types/GreekModes/ScaleDegreeType";
import { useGlobal } from "./GlobalContext";

export enum PlaybackState {
  Stopped,
  PlayingScale,
}

interface AudioContextType {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  currentPlayingScaleDegree: ScaleDegreeIndex | null;
  startScalePlayback: (keyTextMode: KeyDisplayMode) => void;
  stopScalePlayback: () => void;
  playNote: (index: ActualIndex) => void;
  stopAllNotes: () => void;
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
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>(PlaybackState.Stopped);
  const [currentPlayingScaleDegree, setCurrentPlayingScaleDegree] =
    useState<ScaleDegreeIndex | null>(null);
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { globalMode } = useGlobal();
  const scaleDegreeIndexRef = useRef<ScaleDegreeIndex>(ixScaleDegreeIndex(0));
  const automaticPlaybackIdRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio state
  useEffect(() => {
    setIsAudioInitialized(true);
    return () => {
      if (automaticPlaybackIdRef.current) {
        clearInterval(automaticPlaybackIdRef.current);
      }
    };
  }, []);

  const playScaleStep = (keyTextMode: KeyDisplayMode): void => {
    if (!selectedMusicalKey) return;

    const currentIndex = scaleDegreeIndexRef.current;

    if (currentIndex >= selectedMusicalKey.scalePatternLength) {
      scaleDegreeIndexRef.current = ixScaleDegreeIndex(0);
      setCurrentPlayingScaleDegree(null);
      return;
    }

    setCurrentPlayingScaleDegree(currentIndex);
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(currentIndex + 1);
  };

  const startAutomaticPlayback = (keyTextMode: KeyDisplayMode) => {
    if (automaticPlaybackIdRef.current) {
      clearInterval(automaticPlaybackIdRef.current);
    }

    const interval = keyTextMode === KeyDisplayMode.Roman ? 500 : 200;
    automaticPlaybackIdRef.current = setInterval(() => playScaleStep(keyTextMode), interval);
    setPlaybackState(PlaybackState.PlayingScale);
  };

  const stopScalePlayback = () => {
    if (automaticPlaybackIdRef.current) {
      clearInterval(automaticPlaybackIdRef.current);
      automaticPlaybackIdRef.current = null;
    }
    setPlaybackState(PlaybackState.Stopped);
    setCurrentPlayingScaleDegree(null);
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(0);
  };

  const startScalePlayback = (keyTextMode: KeyDisplayMode) => {
    if (!selectedMusicalKey) return;
    startAutomaticPlayback(keyTextMode);
  };

  const playNote = (index: ActualIndex) => {
    if (globalMode === "Advanced") {
      setCurrentPlayingScaleDegree(ixScaleDegreeIndex(index));
    }
  };

  const stopAllNotes = () => {
    setCurrentPlayingScaleDegree(null);
  };

  const value = {
    isAudioInitialized,
    playbackState,
    currentPlayingScaleDegree,
    startScalePlayback,
    stopScalePlayback,
    playNote,
    stopAllNotes,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
