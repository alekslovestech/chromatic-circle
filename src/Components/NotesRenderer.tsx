import React, { useEffect, useRef } from "react";
import { GetNoteNameFromIndex } from "../NoteUtils";
import { Accidental, NotationType } from "../NoteDisplayModes";
import { Vex, StaveNote } from "vexflow";
import { useNotes } from "./NotesContext";
import { isBlackKey } from "../ChromaticUtils";

const EasyScoreFromNotes = (
  myNotes: number[],
  selectedAccidental: Accidental
): StaveNote[] => {
  const ret = myNotes.map((noteIndex) => {
    const noteName = GetNoteNameFromIndex(
      noteIndex,
      selectedAccidental,
      NotationType.EasyScore
    );
    const name = `${noteName}/4`;
    console.log(name);

    const note = new StaveNote({
      keys: [name],
      duration: "w",
    });
    const accidental = noteName.includes("#")
      ? "#"
      : noteName.includes("b")
      ? "b"
      : null;
    if (accidental) {
      note.addModifier(new Vex.Flow.Accidental(accidental), 0);
    }
    return note;
  });
  return ret;
};

const NotesRenderer: React.FC = () => {
  const divRef = useRef(null);
  const { selectedNoteIndices, selectedAccidental } = useNotes();
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
    stave.addClef("treble").addKeySignature("C"); //.addTimeSignature("4/4");
    stave.setStyle({ strokeStyle: "#000000" });

    stave.setContext(context).draw();

    // Create notes
    const notes = EasyScoreFromNotes(selectedNoteIndices, selectedAccidental);

    // Create a voice in 4/4
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
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
  }, [selectedNoteIndices, selectedAccidental]);

  return <div ref={divRef} />;
};

export default NotesRenderer;
