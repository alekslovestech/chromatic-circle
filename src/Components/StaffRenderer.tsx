import React, { useEffect, useRef } from "react";
import { Vex, StaveNote } from "vexflow";

import { getAccidentalSignForEasyScore } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { MusicalKey } from "../types/MusicalKey";
import { KeyType } from "../types/KeyType";

import { useMusical } from "../contexts/MusicalContext";

const EasyScoreFromNotes = (
  actualIndices: ActualIndex[],
  selectedMusicalKey: MusicalKey,
): StaveNote[] => {
  const keys = actualIndices.map((actualIndex) => {
    const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
    const noteInfo = selectedMusicalKey.getNoteInKey(chromaticIndex);
    return {
      key: `${noteInfo.noteName}/${4 + octaveOffset}`,
      accidentalSign: getAccidentalSignForEasyScore(noteInfo.accidental),
      index: actualIndices.indexOf(actualIndex),
    };
  });

  const chordNote = new StaveNote({
    keys: keys.map((k) => k.key),
    duration: "w",
  });

  keys.forEach(({ accidentalSign, index }) => {
    if (accidentalSign) {
      chordNote.addModifier(new Vex.Flow.Accidental(accidentalSign), index);
    }
  });

  return [chordNote];
};

const getKeySignatureForVex = (musicalKey: MusicalKey) => {
  const pureKey = musicalKey.tonicString;
  const majorMinor = musicalKey.classicalMode === KeyType.Major ? "" : "m";
  return pureKey + majorMinor;
};

const StaffRenderer: React.FC = () => {
  const staffDivRef = useRef(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();
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
    stave.addClef("treble").addKeySignature(getKeySignatureForVex(selectedMusicalKey)); //.addTimeSignature("4/4");
    stave.setStyle({ strokeStyle: "black" });

    stave.setContext(context).draw();

    if (selectedNoteIndices.length === 0) return;
    // Create notes
    const notes = EasyScoreFromNotes(selectedNoteIndices, selectedMusicalKey);

    // Create a voice in 4/4
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables(notes);

    new VF.Formatter().joinVoices([voice]).format([voice], 200);

    // Render voice
    voice.draw(context, stave);
  }, [selectedNoteIndices, selectedMusicalKey]);

  return (
    <div className="staff-container" ref={containerRef}>
      <div ref={staffDivRef}></div>
    </div>
  );
};

export default StaffRenderer;
