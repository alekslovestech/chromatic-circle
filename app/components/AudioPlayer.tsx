"use client";

import React, { useEffect } from "react";
import * as Tone from "tone";
import { useAudio } from "../contexts/AudioContext";

const AudioPlayer: React.FC = () => {
  const { isInitialized, setAudioInitialized, playNote } = useAudio();

  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!isInitialized) {
        await Tone.start();
        setAudioInitialized(true);
      }
    };

    // Add event listeners for both click and touch events
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [isInitialized, setAudioInitialized]);

  // Initialize Tone.js synth
  useEffect(() => {
    if (isInitialized) {
      const synth = new Tone.Synth().toDestination();
      return () => {
        synth.dispose();
      };
    }
  }, [isInitialized]);

  const getFrequencyFromIndex = (index: number): number => {
    // A4 = 440Hz, which is index 0 in our system
    return 440 * Math.pow(2, index / 12);
  };

  const playNoteFromIndex = (index: number) => {
    if (isInitialized) {
      const frequency = getFrequencyFromIndex(index);
      playNote(frequency);
    }
  };

  return (
    <div className="audio-player">
      {!isInitialized && <div className="audio-prompt">Tap anywhere to enable sound</div>}
    </div>
  );
};

export default AudioPlayer;
