import React from "react";
import { useNotes } from "./NotesContext";
import { KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";

const MusicalKeySelector: React.FC = () => {
  const { selectedMusicalKey, setSelectedAccidental, setSelectedMusicalKey } = useNotes();
  const keys = MusicalKeyUtil.getKeyList(selectedMusicalKey.mode);

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = new MusicalKey(event.target.value, selectedMusicalKey.mode);
    setSelectedMusicalKey(newKey);
    setSelectedAccidental(newKey.getDefaultAccidental());
  };

  const handleMajorToggle = () => {
    const newKey = selectedMusicalKey.getRelativeKey();

    setSelectedMusicalKey(newKey);
    setSelectedAccidental(newKey.getDefaultAccidental());
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={handleMajorToggle} style={{ marginRight: "10px" }}>
        {selectedMusicalKey.mode === KeyType.Major ? ":)" : ":("}
      </button>
      <select onChange={handleKeyChange} value={selectedMusicalKey.tonicString}>
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MusicalKeySelector;
