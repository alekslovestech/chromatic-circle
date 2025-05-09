import React, { createContext, useContext, useState, useRef } from "react";
import { KeyDisplayMode } from "../types/SettingModes";
import { useMusical } from "./MusicalContext";
import { ixScaleDegreeIndex, ScaleDegreeIndex } from "../types/GreekModes/ScaleDegreeType";
import { chromaticToActual, ixOctaveOffset } from "../types/IndexTypes";

export enum PlaybackState {
  ScaleComplete, //sound does not necessarily stop, but we're not playing a scale
  ScalePlaying, //sound is playing
}

export enum ScalePlaybackMode {
  SingleNote = "Single Note",
  Triad = "Triad",
  Seventh = "Seventh",
}

const PLAYBACK_INTERVAL_SINGLE_NOTE = 300;
const PLAYBACK_INTERVAL_CHORD = 500;
interface AudioContextType {
  isAudioInitialized: boolean;
  playbackState: PlaybackState;
  startScalePlayback: (keyTextMode: KeyDisplayMode) => void;
  stopScalePlayback: () => void;
  setAudioInitialized: (initialized: boolean) => void;
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
  const [playbackState, setPlaybackState] = useState<PlaybackState>(PlaybackState.ScaleComplete);
  const { selectedMusicalKey, setSelectedNoteIndices } = useMusical();

  const scaleDegreeIndexRef = useRef<ScaleDegreeIndex>(ixScaleDegreeIndex(0));
  const playbackTimerIdRef = useRef<NodeJS.Timeout | null>(null);
  const landingNoteRef = useRef(false);
  const scalePlaybackModeRef = useRef<ScalePlaybackMode>(ScalePlaybackMode.SingleNote);

  const getScalePlaybackMode = (keyDisplayMode: KeyDisplayMode) => {
    if (keyDisplayMode === KeyDisplayMode.Roman) {
      return ScalePlaybackMode.Triad;
    }
    return ScalePlaybackMode.SingleNote;
  };

  const startScalePlayback = (keyTextMode: KeyDisplayMode) => {
    console.log("Starting scale playback");
    if (!selectedMusicalKey || !isAudioInitialized) return;

    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
    }

    scalePlaybackModeRef.current = getScalePlaybackMode(keyTextMode);
    const intervalDuration =
      scalePlaybackModeRef.current === ScalePlaybackMode.SingleNote
        ? PLAYBACK_INTERVAL_SINGLE_NOTE
        : PLAYBACK_INTERVAL_CHORD;
    playbackTimerIdRef.current = setInterval(() => playScaleStep(), intervalDuration);
    setPlaybackState(PlaybackState.ScalePlaying);
  };

  const playScaleStep = () => {
    //final step - land on the tonic
    if (landingNoteRef.current) {
      console.assert(selectedMusicalKey, "selectedMusicalKey should always be defined");
      console.log("PlayScaleStep: landing on the tonic");
      const actualTonicIndex = chromaticToActual(selectedMusicalKey!.tonicIndex, ixOctaveOffset(0));
      setSelectedNoteIndices([actualTonicIndex]);
      stopScalePlayback();
      landingNoteRef.current = false;
      return;
    }

    //play the note(s) for the current scale degree
    const currentScaleDegreeIndex = scaleDegreeIndexRef.current;
    console.log(`Playing scale step, scaleDegreeIndex = ${currentScaleDegreeIndex}`);

    // const isTriad = scalePlaybackModeRef.current === ScalePlaybackMode.Triad;
    const noteIndices = selectedMusicalKey.getNoteIndicesForScaleDegree(
      currentScaleDegreeIndex,
      scalePlaybackModeRef.current,
    );
    setSelectedNoteIndices(noteIndices);

    //if we've played the last note (e.g. 7th degree), prepare to land on the tonic
    if (currentScaleDegreeIndex === selectedMusicalKey.scalePatternLength - 1) {
      landingNoteRef.current = true;
      return;
    }

    // Move to next degree
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(currentScaleDegreeIndex + 1);
  };

  const stopScalePlayback = () => {
    console.log("AudioContext: Stopping scale playback");
    if (playbackTimerIdRef.current) {
      clearInterval(playbackTimerIdRef.current);
      playbackTimerIdRef.current = null;
    }
    setPlaybackState(PlaybackState.ScaleComplete);
    scaleDegreeIndexRef.current = ixScaleDegreeIndex(0);
  };

  const value = {
    isAudioInitialized,
    playbackState,
    startScalePlayback,
    stopScalePlayback,
    setAudioInitialized: setIsAudioInitialized,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
