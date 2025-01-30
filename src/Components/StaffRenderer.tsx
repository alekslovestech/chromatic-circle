import React, { useEffect, useRef } from "react";
import { getNoteWithAccidentalFromIndex } from "../utils/NoteUtils";
import { AccidentalType, getAccidentalSignForEasyScore } from "../types/AccidentalType";
import { Vex, StaveNote } from "vexflow";
import { useNotes } from "./NotesContext";
import { ActualIndex } from "../types/IndexTypes";

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
    const accidentalSign = getAccidentalSignForEasyScore(accidental);
    if (accidentalSign) {
      chordNote.addModifier(new Vex.Flow.Accidental(accidentalSign), index);
    }
  });

  return [chordNote];
};

const StaffRenderer: React.FC = () => {
  const staffDivRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedNoteIndices, selectedAccidental } = useNotes();
  useEffect(() => {
    if (!staffDivRef.current) return;

    let curStaffDiv = staffDivRef.current as HTMLElement;
    curStaffDiv.innerHTML = "";

    const VF = Vex.Flow;
    const renderer = new VF.Renderer(staffDivRef.current, VF.Renderer.Backends.SVG);
    const staffHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--staff-height"),
    );
    renderer.resize(containerRef.current?.clientWidth || 800, staffHeight);

    const context = renderer.getContext();

    // Create a stave at position 10, 40 of width half the enclosing container's width.
    const originalContainerWidth = containerRef.current?.clientWidth || 0;
    const staveWidth = originalContainerWidth * 0.6;
    const stave = new VF.Stave(0, 0, staveWidth);
    stave.addClef("treble").addKeySignature("C"); //.addTimeSignature("4/4");
    stave.setStyle({ strokeStyle: "black" });

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
  }, [selectedNoteIndices, selectedAccidental]);

  return (
    <div className="staff-container" ref={containerRef}>
      <div ref={staffDivRef}></div>
    </div>
  );
};

export default StaffRenderer;
