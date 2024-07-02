import React, { useEffect, useRef } from "react";
import { StaveNote, Vex } from "vexflow";
import { EASYSCORE_NAMES_SHARP } from "./NoteConstants";

const EasyScoreFromNotes = (myNotes: number[]): StaveNote[] => {
  const noteNames = myNotes.map((note) => `${EASYSCORE_NAMES_SHARP[note]}/4`);
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
    stave.addClef("treble"); //.addKeySignature("C");
    stave.setContext(context).draw();

    // Create notes
    const notes = EasyScoreFromNotes([0, 3, 7]);

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
  }, []);

  return <div ref={divRef} />;
};

export default NotesRenderer;
