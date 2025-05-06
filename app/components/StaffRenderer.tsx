"use client";

import React, { useEffect, useRef } from "react";
import { Factory } from "vexflow";
import { useMusical } from "../contexts/MusicalContext";
import { useDisplay } from "../contexts/DisplayContext";

const StaffRenderer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedIndices } = useMusical();
  const { noteDisplayMode } = useDisplay();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = "";

    // Create a new VexFlow factory
    const factory = new Factory.Renderer(400, 120);
    const context = factory.getContext();
    const stave = new Factory.Stave(10, 0, 380);

    // Add the stave to the context
    stave.addClef("treble").setContext(context).draw();

    // Create notes based on selected indices
    const notes = selectedIndices.map((index) => {
      const noteName = getNoteNameFromIndex(index);
      return new Factory.StaveNote({
        keys: [noteName],
        duration: "q",
      });
    });

    // Create a voice with the notes
    const voice = new Factory.Voice({
      num_beats: 4,
      beat_value: 4,
    });
    voice.addTickables(notes);

    // Format and draw the voice
    new Factory.Formatter().joinVoices([voice]).format([voice], 380);
    voice.draw(context, stave);
  }, [selectedIndices, noteDisplayMode]);

  const getNoteNameFromIndex = (index: number): string => {
    const noteNames = [
      "c/4",
      "c#/4",
      "d/4",
      "d#/4",
      "e/4",
      "f/4",
      "f#/4",
      "g/4",
      "g#/4",
      "a/4",
      "a#/4",
      "b/4",
    ];
    return noteNames[index % 12];
  };

  return <div className="staff-container" ref={containerRef} />;
};

export default StaffRenderer;
