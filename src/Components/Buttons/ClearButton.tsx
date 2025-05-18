import { useMusical } from "../../contexts/MusicalContext";
import { Button } from "../Common/Button";

export const ClearButton: React.FC = () => {
  const { setSelectedNoteIndices } = useMusical();
  return (
    <Button
      size="sm"
      variant="action"
      density="comfortable"
      onClick={() => setSelectedNoteIndices([])}
    >
      Clear
    </Button>
  );
};
