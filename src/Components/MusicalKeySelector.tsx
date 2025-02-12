import React from "react";
import { useNotes } from "./NotesContext";
import { KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";

const MusicalKeySelector: React.FC = () => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useNotes();
  const keys = MusicalKeyUtil.getKeyList(selectedMusicalKey.mode);

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = new MusicalKey(event.target.value, selectedMusicalKey.mode);
    setSelectedMusicalKey(newKey);
  };

  const handleMajorToggle = () => {
    const newKey = selectedMusicalKey.getRelativeKey();
    setSelectedMusicalKey(newKey);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select onChange={handleKeyChange} value={selectedMusicalKey.tonicString}>
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button onClick={handleMajorToggle} style={{ marginRight: "10px" }}>
        {selectedMusicalKey.mode === KeyType.Major ? "Major" : "Minor"}
      </button>
    </div>
  );
};

export default MusicalKeySelector;
