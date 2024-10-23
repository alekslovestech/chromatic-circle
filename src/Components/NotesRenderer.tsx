import React, { useEffect, useRef } from "react";
import { getNoteWithAccidentalFromIndex, getAccidentalSign } from "../utils/NoteUtils";
import { NotationType } from "../types/NotationType";
import { AccidentalType } from "../types/AccidentalType";
import { Vex, StaveNote } from "vexflow";
import { useNotes } from "./NotesContext";
import { ActualIndex } from "../types/IndexTypes";
import "../styles/NotesRenderer.css";

const EasyScoreFromNotes = (
  myNotes: ActualIndex[],
  selectedAccidental: AccidentalType,
): StaveNote[] => {
  const noteInfo = myNotes.map((chromaticIndex) =>
    getNoteWithAccidentalFromIndex(chromaticIndex, selectedAccidental),
  );

  const keys = noteInfo.map(({ noteName, octave }) => `${noteName}/${octave}`);

  const chordNote = new StaveNote({
    keys,
    duration: "w",
  });

  noteInfo.forEach(({ accidental }, index) => {
    const accidentalSign = getAccidentalSign(accidental, NotationType.EasyScore);
    if (accidentalSign) {
      chordNote.addModifier(new Vex.Flow.Accidental(accidentalSign), index);
    }
  });

  return [chordNote];
};

const NotesRenderer: React.FC = () => {
  const staffDivRef = useRef(null);
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  useEffect(() => {
    if (!staffDivRef.current) return;

    let curStaffDiv = staffDivRef.current as HTMLElement;
    curStaffDiv.innerHTML = "";

    const VF = Vex.Flow;
    const renderer = new VF.Renderer(staffDivRef.current, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 120);
    const context = renderer.getContext();

    // Create a stave at position 10, 40 of width half the enclosing container's width.
    const originalContainerWidth =
      document.querySelector(".notes-renderer-container")?.clientWidth || 0;
    const staveWidth = originalContainerWidth * 0.75;
    const staveOffset = (originalContainerWidth - curStaffDiv.clientWidth) / 2; // Center the stave in the container
    console.log(
      `clientWidth, staveWidth, staveOffset =`,
      curStaffDiv.clientWidth,
      staveWidth,
      staveOffset,
    );
    const stave = new VF.Stave(staveOffset, 0, staveWidth);
    stave.addClef("treble").addKeySignature("C"); //.addTimeSignature("4/4");
    stave.setStyle({ strokeStyle: "#000000" });

    stave.setContext(context).draw();

    if (selectedNoteIndices.length === 0) return;
    // Create notes
    const notes = EasyScoreFromNotes(selectedNoteIndices, selectedAccidental);

    // Create a voice in 4/4
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables(notes);

    new VF.Formatter().joinVoices([voice]).format([voice], 200);

    // Render voice
    voice.draw(context, stave);

    return () => {
      // Cleanup if needed
    };
  }, [selectedNoteIndices, selectedAccidental]);

  return (
    // No need for the notes-renderer-container div here
    <div className="staff-container" ref={staffDivRef} />
  );
};

export default NotesRenderer;
