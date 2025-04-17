import React, { useEffect, useRef, useCallback } from "react";
import { TWELVE } from "../types/NoteConstants";

import { useMusical } from "../contexts/MusicalContext";

const SOUND_URL = "/piano-shot.wav";
const FREQ_MULTIPLIER = 0.25;

const getMultiplierFromIndex = (index: number) => {
  return Math.pow(2, index / TWELVE);
};

const AudioPlayer: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const { selectedNoteIndices } = useMusical();

  const loadAudio = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
    if (!audioContextRef) {
      throw new Error("Audio context is not initialized");
    }
    audioBufferRef.current =
      audioContextRef.current != null
        ? await audioContextRef.current.decodeAudioData(arrayBuffer)
        : null;
  };

  const playSound = (index: number) => {
    const playbackRate = getMultiplierFromIndex(index);

    if (!audioContextRef.current) {
      console.error("Audio context is not initialized");
      return;
    }
    var source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.playbackRate.value = playbackRate * FREQ_MULTIPLIER;
    source.connect(audioContextRef.current.destination);
    source.start(0);
    activeSourcesRef.current.push(source);
    source.onended = function () {
      source.disconnect();
    };
  };

  const playSelectedNotes = useCallback(() => {
    activeSourcesRef.current.forEach((source) => source.stop());
    selectedNoteIndices.forEach((index) => playSound(index));
  }, [selectedNoteIndices]);

  //On mount, create the audio context
  useEffect(() => {
    if (!audioContextRef.current) {
      console.log("Creating audio context (AudioPlayer.tsx), soundUrl=", SOUND_URL);
      audioContextRef.current = new AudioContext();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (!audioContextRef || !SOUND_URL) {
      console.log("audioContext or soundUrl is null");
      return;
    }

    console.log("audioContext is initialized, now loading audio from:", SOUND_URL);
    loadAudio(SOUND_URL).then(() => {
      playSelectedNotes();
    });

    return;
  }, [audioContextRef, playSelectedNotes]);

  useEffect(() => {
    if (!audioBufferRef.current) {
      console.log("audioBuffer not loaded or audioContext is null");
      return;
    }
    playSelectedNotes();

    return;
  }, [selectedNoteIndices, audioBufferRef, playSelectedNotes]);

  return null;
};

export default AudioPlayer;
