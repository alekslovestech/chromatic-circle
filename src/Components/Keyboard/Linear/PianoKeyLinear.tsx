import React from "react";

import { ActualIndex, actualIndexToChromaticAndOctave } from "../../../types/IndexTypes";
import { KeyDisplayMode } from "../../../types/SettingModes";

import { IndexUtils } from "../../../utils/IndexUtils";
import { isBlackKey } from "../../../utils/Keyboard/KeyboardUtils";
import { LinearKeyboardUtils } from "../../../utils/Keyboard/Linear/LinearKeyboardUtils";

import { useMusical } from "../../../contexts/MusicalContext";
import { useDisplay } from "../../../contexts/DisplayContext";
import { useGlobal, GlobalMode } from "../../../contexts/GlobalContext";
import { VisualStateUtils } from "../../Common/VisualStateUtils";

interface PianoKeyProps {
  actualIndex: ActualIndex;
  isRootNote: boolean;
  onClick: (index: ActualIndex) => void;
}

export const PianoKeyLinear: React.FC<PianoKeyProps> = ({ actualIndex, isRootNote, onClick }) => {
  const { globalMode } = useGlobal();
  const { selectedMusicalKey, selectedNoteIndices } = useMusical();
  const { monochromeMode } = useDisplay();

  const isShortKey = isBlackKey(actualIndex);
  const { chromaticIndex } = actualIndexToChromaticAndOctave(actualIndex);
  const left = LinearKeyboardUtils.getKeyPosition(actualIndex);

  const baseClasses = ["key-base", "piano-key"];
  const isSelected = selectedNoteIndices.includes(actualIndex);
  const isAdvanced = globalMode === GlobalMode.Advanced;

  console.log(`isRootNote: ${isRootNote} should be used somewhere`);

  const visualClasses = VisualStateUtils.getKeyVisualClasses(
    chromaticIndex,
    isAdvanced,
    selectedMusicalKey,
    monochromeMode,
    isShortKey,
    isSelected,
    false,
  );

  if (isShortKey) baseClasses.push("short");
  if (isAdvanced) baseClasses.push("disabled");

  const id = IndexUtils.StringWithPaddedIndex("linearKey", actualIndex);
  const noteText = selectedMusicalKey.getDisplayString(chromaticIndex, KeyDisplayMode.NoteNames);

  return (
    <div
      id={id}
      className={[...baseClasses, ...visualClasses].join(" ")}
      style={{ left }}
      onClick={() => onClick(actualIndex)}
    >
      {noteText}
    </div>
  );
};
