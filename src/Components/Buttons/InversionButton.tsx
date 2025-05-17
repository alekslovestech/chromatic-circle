import { useMusical } from "../../contexts/MusicalContext";
import { usePreset } from "../../contexts/PresetContext";
import { InversionIndex } from "../../types/IndexTypes";
import { ChordUtils } from "../../utils/ChordUtils";
import { IndexUtils } from "../../utils/IndexUtils";
import { Button } from "../Common/Button";

export const InversionButton: React.FC<{ inversionIndex: InversionIndex }> = ({
  inversionIndex,
}) => {
  const { selectedNoteIndices, setSelectedNoteIndices } = useMusical();
  const { selectedChordType } = usePreset();
  const { selectedInversionIndex, setSelectedInversionIndex } = usePreset();

  const handleInversionChange = (newInversionIndex: InversionIndex) => {
    const originalRootIndex = IndexUtils.rootNoteAtInversion(
      selectedNoteIndices,
      selectedInversionIndex,
    );
    setSelectedInversionIndex(newInversionIndex);
    const updatedIndices = ChordUtils.calculateChordNotesFromIndex(
      originalRootIndex,
      selectedChordType,
      newInversionIndex,
    );
    setSelectedNoteIndices(updatedIndices);
  };

  return (
    <Button
      id={`inversion-${inversionIndex}`}
      key={inversionIndex}
      size="sm"
      variant="selection"
      density="comfortable"
      onClick={() => handleInversionChange(inversionIndex)}
      selected={selectedInversionIndex === inversionIndex}
    >
      {inversionIndex}
    </Button>
  );
};
