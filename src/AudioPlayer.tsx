import { CircleMath } from "./CircleMath";
import React, { useEffect, useRef } from "react";
import { useNotes } from "./NotesContext";
import { NOTE_NAMES } from "./ChromaticUtils";

const soundUrl = "/piano-shot.wav";
const FREQ_MULTIPLIER = 0.25;

const AudioPlayer: React.FC = () => {
  const audioContextRef = useRef<AudioContext|null>(null);
  const audioBufferRef = useRef<AudioBuffer|null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const { selectedNoteIndices } = useNotes();

  const loadAudio = async (url: string) => {
    const response = await fetch(url);
    const arrayBuffer:ArrayBuffer = await response.arrayBuffer();
    console.log(arrayBuffer);
    if (!audioContextRef) {
        throw new Error ("Audio context is not initialized");
    }
    audioBufferRef.current = audioContextRef.current != null 
      ? await audioContextRef.current.decodeAudioData(arrayBuffer)
      : null;    
  };

  const playSound = (index: number) => {
    const playbackRate = CircleMath.GetMultiplierFromIndex(index);

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
    console.log("audio started for index=", index);
    source.onended = function () {
      console.log("Audio ended for index=", index);
      source.disconnect();
    };
  };

  const playSelectedNotes = () => {
    activeSourcesRef.current.forEach((source) => source.stop());
    console.log(`Playing selected notes = [${selectedNoteIndices}]`);
    selectedNoteIndices.forEach((index) => playSound(index));
  };

  //On mount, create the audio context
  useEffect(() => {
    if (!audioContextRef.current) {
      console.log("Creating audio context (AudioPlayer.tsx), soundUrl=", soundUrl);
      audioContextRef.current = new AudioContext();
    }
    return () => {
      console.log("Cleaning up audio context (AudioPlayer.tsx)");
      //if (audioContextRef.current) 
       // audioContextRef.current.close(); // Cleanup the audio context when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (!audioContextRef || !soundUrl) {
      console.log("audioContext or soundUrl is null");
      return;
    }

    console.log(
      "audioContext is initialized, now loading audio from:",
      soundUrl
    );
    loadAudio(soundUrl).then(() => {
      console.log("Audio buffer loaded successfully");
      playSelectedNotes();
    });

    return; // () => sourceNode?.stop(); // Stop the audio when the src changes or component unmounts
  }, [audioContextRef]);

  useEffect(() => {
    if (!audioBufferRef.current) {
      console.log("audioBuffer not loaded or audioContext is null");
      return;
    }
    playSelectedNotes();

    return; // () => sourceNode?.stop(); // Stop the audio when the src changes or component unmounts
  }, [selectedNoteIndices, audioBufferRef]);

  return (
    <div>
      Playing Notes:{" "}
      {selectedNoteIndices.map((one) => NOTE_NAMES[one]).join("-")}
    </div>
  );
};

export default AudioPlayer;
