import { CircleMath } from "./CircleMath";
import React, { useState, useEffect } from "react";
import { useNotes } from "./NotesContext";
import { NOTE_NAMES } from "./ChromaticUtils";

const soundUrl = "/piano-shot.wav";
const FREQ_MULTIPLIER = 0.25;

const AudioPlayer = () => {
  const [audioContext, setAudioContext] = useState(new AudioContext());
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer|null>(null);
  const { selectedNoteIndices } = useNotes();

  const loadAudio = async (url: string): Promise<AudioBuffer> => {
    const response = await fetch(url);
    const arrayBuffer:ArrayBuffer = await response.arrayBuffer();
    console.log(arrayBuffer);
    if (!audioContext) {
        throw new Error ("Audio context is not initialized");
    }
    const theBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return theBuffer;
  };

  const playSound = (index: number) => {
    const playbackRate = CircleMath.GetMultiplierFromIndex(index);

    if (!audioContext) {
      console.error("Audio context is not initialized");
      return;
    }
    var source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = playbackRate * FREQ_MULTIPLIER;
    source.connect(audioContext.destination);
    source.start(0);
    console.log("audio started for index=", index);
    source.onended = function () {
      console.log("Audio ended for index=", index);
      source.disconnect();
    };
  };

  const playSelectedNotes = () => {
    console.log(`Playing selected notes = [${selectedNoteIndices}]`);
    selectedNoteIndices.forEach((index) => playSound(index));
  };

  //On mount, create the audio context
  useEffect(() => {
    console.log("Creating audio context (AudioPlayer.js), soundUrl=", soundUrl);
    const ac: AudioContext = new AudioContext();
    setAudioContext(ac);
    return () => {
      console.log("Cleaning up audio context (AudioPlayer.js)");
      ac.close(); // Cleanup the audio context when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (!audioContext || !soundUrl) {
      console.log("audioContext or soundUrl is null");
      return;
    }

    console.log(
      "audioContext is initialized, now loading audio from:",
      soundUrl
    );
    loadAudio(soundUrl).then((buffer: AudioBuffer) => {
      setAudioBuffer(buffer);
    });

    return; // () => sourceNode?.stop(); // Stop the audio when the src changes or component unmounts
  }, [audioContext]);

  useEffect(() => {
    if (!audioBuffer) {
      console.log("audioBuffer not loaded or audioContext is null");
      return;
    }
    playSelectedNotes();

    return; // () => sourceNode?.stop(); // Stop the audio when the src changes or component unmounts
  }, [selectedNoteIndices, audioBuffer]);

  return (
    <div>
      Playing Notes:{" "}
      {selectedNoteIndices.map((one) => NOTE_NAMES[one]).join("-")}
    </div>
  );
};

export default AudioPlayer;
