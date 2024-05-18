import { CircleMath } from "./CircleMath.js";
import React, { useState, useEffect } from "react";
import { useNotes } from "./NotesContext.js";

//const audioContext = null;
const soundUrl = "/piano-shot.wav";
const AudioPlayer = () => {
  const [audioContext, setAudioContext] = useState(null);
  //const [sourceNode, setSourceNode] = useState(null);
  const { selectedNoteIndices } = useNotes();

  const loadAudio = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    console.log(arrayBuffer);
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  const playSound = (index) => {
    const playbackRate = CircleMath.GetMultiplierFromIndex(index);
    const [audioContext, setAudioContext] = useState(null);

    if (!audioContext) {
      console.error("Audio context is not initialized");
      return;
    }
    var source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = playbackRate;
    source.connect(audioContext.destination);
    source.start(0);
    source.onended = function () {
      source.disconnect();
    };
  };

  const playSelectedNotes = () => {
    for (let i = 0; i < selectedNoteIndices.length; i++) {
      playSound(selectedNoteIndices[i]);
    }
  };

  useEffect(() => {
    console.log("Creating audio context (AudioPlayer.js), soundUrl=", soundUrl);
    const ac = new AudioContext();
    setAudioContext(ac);
    return () => {
      /*console.log("Cleaning up audio context (AudioPlayer.js)");
      ac.close(); // Cleanup the audio context when the component unmounts */
    };
  }, [soundUrl]);

  useEffect(() => {
    if (!audioContext || !soundUrl) {
      console.log("audioContext or soundUrl is null");
      return;
    }
    //const { selectedNoteIndices } = useNotes();

    const source = audioContext.createBufferSource();
    loadAudio(soundUrl).then((audioBuffer) => {
      console.log("Audio loaded successfully");
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      //setSourceNode(source);
    });

    return; // () => sourceNode?.stop(); // Stop the audio when the src changes or component unmounts
  }, [audioContext, soundUrl, selectedNoteIndices]);

  return <div>Playing Audio: {soundUrl}</div>;
};

export default AudioPlayer;
