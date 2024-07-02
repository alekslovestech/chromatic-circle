import React, { useEffect, useRef } from "react";
import { GetNoteNameFromIndex } from "../NoteUtils";
import { Accidental, NotationType } from "../NoteDisplayModes";
import { Vex, StaveNote } from "vexflow";
import { useNotes } from "./NotesContext";

const EasyScoreFromNotes = (myNotes: number[]): StaveNote[] => {
  const noteNames = myNotes.map((noteIndex) => {
    const noteName = GetNoteNameFromIndex(
      noteIndex,
      Accidental.Sharp,
      NotationType.EasyScore
    );
    return `${noteName}/4`;
  });
  console.log(noteNames);

  const notes = [
    new StaveNote({
      keys: noteNames,
      duration: "w",
    }),
  ];
  return notes;
};

const NotesRenderer: React.FC = () => {
  const divRef = useRef(null);
  const { selectedNoteIndices } = useNotes();
  useEffect(() => {
    if (!divRef.current) return;

    let curDivRef = divRef.current as HTMLElement;
    curDivRef.innerHTML = "";

    const VF = Vex.Flow;
    const renderer = new VF.Renderer(divRef.current, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 200);
    const context = renderer.getContext();

    // Create a stave at position 10, 40 of width 400 on the canvas.
    const stave = new VF.Stave(150, 40, 150);
    stave.addClef("treble").addKeySignature("D"); //.addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Create notes
    const notes = EasyScoreFromNotes(selectedNoteIndices);

    // Create a voice in 4/4
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    const formatter = new VF.Formatter()
      .joinVoices([voice])
      .format([voice], 400);

    // Render voice
    voice.draw(context, stave);

    return () => {
      // Cleanup if needed
    };
  }, [selectedNoteIndices]);

  return <div ref={divRef} />;
};

export default NotesRenderer;
