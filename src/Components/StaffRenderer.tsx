import React, { useEffect, useRef } from "react";
import { Factory, StaveNote } from "vexflow";

import { getAccidentalSignForEasyScore } from "../types/AccidentalType";
import { ActualIndex, actualIndexToChromaticAndOctave } from "../types/IndexTypes";
import { MusicalKey } from "../types/Keys/MusicalKey";
import { KeyType } from "../types/Keys/KeyType";
import { useMusical } from "../contexts/MusicalContext";
import { KeyNoteResolver } from "../types/Keys/KeyNoteResolver";

const EasyScoreFromNotes = (
  actualIndices: ActualIndex[],
  selectedMusicalKey: MusicalKey,
  factory: Factory,
): StaveNote[] => {
  const keys = actualIndices.map((actualIndex) => {
    const { chromaticIndex, octaveOffset } = actualIndexToChromaticAndOctave(actualIndex);
    const noteInfo = KeyNoteResolver.resolveNoteInKey(selectedMusicalKey, chromaticIndex);
    return {
      key: `${noteInfo.noteName}/${4 + octaveOffset}`,
      accidentalSign: getAccidentalSignForEasyScore(noteInfo.accidental),
      index: actualIndices.indexOf(actualIndex),
    };
  });

  const chordNote = factory.StaveNote({
    keys: keys.map((k) => k.key),
    duration: "w",
  });

  keys.forEach(({ accidentalSign, index }) => {
    if (accidentalSign) {
      chordNote.addModifier(factory.Accidental({ type: accidentalSign }), index);
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
  const staffDivRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedNoteIndices, selectedMusicalKey } = useMusical();

  useEffect(() => {
    if (!staffDivRef.current) return;

    let curStaffDiv = staffDivRef.current;
    curStaffDiv.innerHTML = "";

    const factory = new Factory({
      renderer: {
        elementId: curStaffDiv.id,
        width: containerRef.current?.clientWidth || 800,
        height: parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--staff-height"),
        ),
      },
    });

    const context = factory.getContext();
    const staveWidth = (containerRef.current?.clientWidth || 0) * 0.6;
    const stave = factory.Stave({
      x: 0,
      y: 0,
      width: staveWidth,
    });

    const canonicalIonianKey = selectedMusicalKey.getCanonicalIonianKey();
    stave.addClef("treble").addKeySignature(getKeySignatureForVex(canonicalIonianKey));
    stave.setStyle({ strokeStyle: "black" });
    stave.setContext(context).draw();

    if (selectedNoteIndices.length === 0) return;

    const notes = EasyScoreFromNotes(selectedNoteIndices, canonicalIonianKey, factory);
    const voice = factory.Voice({ time: "4/4" });
    voice.setStrict(false);
    voice.addTickables(notes);

    factory.Formatter().joinVoices([voice]).format([voice], 200);
    voice.draw(context, stave);
  }, [selectedNoteIndices, selectedMusicalKey]);

  return (
    <div className="staff-container" ref={containerRef}>
      <div id="staff" ref={staffDivRef}></div>
    </div>
  );
};

export default StaffRenderer;
