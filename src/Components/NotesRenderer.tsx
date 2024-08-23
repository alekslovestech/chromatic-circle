import React, { useEffect, useRef } from "react";
import {
  GetNoteWithAccidentalFromIndex,
  GetAccidentalSign,
} from "../utils/NoteUtils";
import { NotationType } from "../types/NotationType";
import { Accidental } from "../types/Accidental";
import { Vex, StaveNote } from "vexflow";
import { useNotes } from "./NotesContext";
import { ActualIndex } from "../types/IndexTypes";

const EasyScoreFromNotes = (
  myNotes: ActualIndex[], //array of ActualIndex
  selectedAccidental: Accidental
): StaveNote[] => {
  const noteInfo = myNotes.map((chromaticIndex) =>
    GetNoteWithAccidentalFromIndex(chromaticIndex, selectedAccidental)
  );

  console.log({ noteInfo });

  const keys = noteInfo.map(({ noteName, octave }) => `${noteName}/${octave}`);

  const chordNote = new StaveNote({
    keys,
    duration: "w",
  });

  noteInfo.forEach(({ accidental }, index) => {
    const accidentalSign = GetAccidentalSign(
      accidental,
      NotationType.EasyScore
    );
    if (accidentalSign) {
      chordNote.addModifier(new Vex.Flow.Accidental(accidentalSign), index);
    }
  });

  return [chordNote];
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
      .format([voice], 200);

    // Render voice
    voice.draw(context, stave);

    return () => {
      // Cleanup if needed
    };
  }, [selectedNoteIndices, selectedAccidental]);

  return <div ref={divRef} />;
};

export default NotesRenderer;
