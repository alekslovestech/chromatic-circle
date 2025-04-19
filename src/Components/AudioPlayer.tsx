import React, { useEffect, useRef, useCallback } from "react";
import { TWELVE } from "../types/NoteConstants";
import * as Tone from "tone";
import { useMusical } from "../contexts/MusicalContext";

// Base frequency for A4 (440Hz)
const BASE_FREQUENCY = 440;
// A4 is at index 69 in MIDI notation
const A4_MIDI_INDEX = 69;

const AudioPlayer: React.FC = () => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const { selectedNoteIndices } = useMusical();

  // Initialize Tone.js synth
  useEffect(() => {
    let isActive = true;

    const initSynth = async () => {
      try {
        // Create a polyphonic synth
        const synth = new Tone.PolySynth(Tone.Synth, {
          oscillator: {
            type: "fatsine2",
          },
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 0.8,
          },
        }).toDestination();

        // Set initial volume
        Tone.getDestination().volume.value = -5; // -12 dB (quieter)

        if (isActive) {
          synthRef.current = synth;
        } else {
          synth.dispose();
        }
      } catch (error) {
        console.error("Failed to initialize synth:", error);
      }
    };

    initSynth();

    // Clean up on unmount
    return () => {
      isActive = false;
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
    };
  }, []);

  // Convert note index to frequency
  const getFrequencyFromIndex = useCallback((index: number): number => {
    // Convert index to MIDI note number (assuming index 0 is C4)
    const midiNote = index + 60; //  C4 is MIDI note 60
    // Calculate frequency using the formula: f = 440 * 2^((midiNote - 69) / 12)
    return BASE_FREQUENCY * Math.pow(2, (midiNote - A4_MIDI_INDEX) / TWELVE);
  }, []);

  // Play a single note
  const playNote = useCallback(
    (index: number) => {
      if (!synthRef.current) return;

      try {
        const frequency = getFrequencyFromIndex(index);
        synthRef.current.triggerAttackRelease(frequency, "4n");
      } catch (error) {
        console.error("Failed to play note:", error);
      }
    },
    [getFrequencyFromIndex],
  );

  // Play all selected notes
  const playSelectedNotes = useCallback(() => {
    if (!synthRef.current) return;

    try {
      // Stop any currently playing notes
      synthRef.current.releaseAll();

      // Play each selected note
      selectedNoteIndices.forEach((index) => playNote(index));
    } catch (error) {
      console.error("Failed to play selected notes:", error);
    }
  }, [selectedNoteIndices, playNote]);

  // Play notes when selection changes
  useEffect(() => {
    if (synthRef.current) {
      playSelectedNotes();
    }
  }, [selectedNoteIndices, playSelectedNotes]);

  // Initialize Tone.js context on user interaction
  const initializeTone = useCallback(async () => {
    try {
      if (Tone.getContext().state !== "running") {
        await Tone.start();
        console.log("Tone.js context started");
      }
    } catch (error) {
      console.error("Failed to start Tone.js context:", error);
    }
  }, []);

  // Add a button to initialize Tone.js (required by browsers)
  return (
    <div>
      <button onClick={initializeTone}>Initialize Audio</button>
    </div>
  );
};

export default AudioPlayer;
