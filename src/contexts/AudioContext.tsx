import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { KeyDisplayMode } from "../types/SettingModes";
import { useMusical } from "./MusicalContext";
import { ixScaleDegreeIndex, ScaleDegreeIndex } from "../types/GreekModes/ScaleDegreeType";
import { useGlobal } from "./GlobalContext";
import { chromaticToActual, ixOctaveOffset } from "../types/IndexTypes";

export enum PlaybackState {
  Stopped,
  Playing,
}

const PLAYBACK_INTERVAL = 300;
const PLAYBACK_INTERVAL_ROMAN = 500;
interface AudioContextType {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  startScalePlayback: (keyTextMode: KeyDisplayMode) => void;
  stopScalePlayback: () => void;
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
  const { globalMode } = useGlobal();
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [playbackState, setPlaybackState] = useState<PlaybackState>(PlaybackState.Stopped);
  const { selectedMusicalKey, setSelectedNoteIndices } = useMusical();

  const scaleDegreeIndexRef = useRef<ScaleDegreeIndex>(ixScaleDegreeIndex(0));
  const playbackTimerIdRef = useRef<NodeJS.Timeout | null>(null);
  const lastNoteRef = useRef(false);
  // Initialize audio state
  useEffect(() => {
    setIsAudioInitialized(true);
    return () => {
      if (playbackTimerIdRef.current) {
        clearInterval(playbackTimerIdRef.current);
      }
    };
  }, []);

  const playScaleStep = (keyTextMode: KeyDisplayMode): void => {
    console.log(`playScaleStep, keyTextMode = ${keyTextMode}`);
    if (!selectedMusicalKey) return;

    const currentScaleDegreeIndex = scaleDegreeIndexRef.current;
    console.log(`Playing scale step, scaleDegreeIndex = ${currentScaleDegreeIndex}`);

    const isRoman = keyTextMode === KeyDisplayMode.Roman;

    if (lastNoteRef.current) {
      console.log("PlayScaleStep: landing on the tonic");
      const actualTonicIndex = chromaticToActual(selectedMusicalKey.tonicIndex, ixOctaveOffset(0));
      setSelectedNoteIndices([actualTonicIndex]);
      if (playbackTimerIdRef.current) {
        clearInterval(playbackTimerIdRef.current);
        playbackTimerIdRef.current = null;
      }
      lastNoteRef.current = false;
      return;
    }

    const noteIndices = selectedMusicalKey.getNoteIndicesForScaleDegree(
      currentScaleDegreeIndex,
      isRoman,
    );
    setSelectedNoteIndices(noteIndices);

    if (currentScaleDegreeIndex === selectedMusicalKey.scalePatternLength - 1) {
      lastNoteRef.current = true;
      return;
    }

    // Move to next degree
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(currentScaleDegreeIndex + 1);
    console.log(`Next scale degree = ${scaleDegreeIndexRef.current}`);
  };

  const startScalePlayback = (keyTextMode: KeyDisplayMode) => {
    console.log("Starting scale playback");
    if (!selectedMusicalKey) return;

    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
    }

    const interval =
      keyTextMode === KeyDisplayMode.Roman ? PLAYBACK_INTERVAL_ROMAN : PLAYBACK_INTERVAL;
    playbackTimerIdRef.current = setInterval(() => playScaleStep(keyTextMode), interval);
    setPlaybackState(PlaybackState.Playing);
  };

  const stopScalePlayback = () => {
    console.log("AudioContext: Stopping scale playback");
    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
      playbackTimerIdRef.current = null;
    }
    setPlaybackState(PlaybackState.Stopped);
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(0);
  };

  const value = {
    isAudioInitialized,
    playbackState,
    startScalePlayback,
    stopScalePlayback,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
