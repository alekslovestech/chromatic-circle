import React from "react";
import { useNotes } from "./NotesContext";
import { KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";

const MusicKeySelector: React.FC = () => {
  const { selectedMusicalKey, setSelectedMusicalKey } = useNotes();

  const [isMajor, setIsMajor] = React.useState(true);
  const majorKeys = MusicalKeyUtil.getMajorsList();
  const minorKeys = MusicalKeyUtil.getMinorsList();
  const keys = isMajor ? majorKeys : minorKeys;

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    setSelectedMusicalKey(new MusicalKey(key, isMajor ? KeyType.Major : KeyType.Minor));
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={() => setIsMajor(!isMajor)} style={{ marginRight: "10px" }}>
        {isMajor ? "Switch to Minor" : "Switch to Major"}
      </button>
      <select onChange={handleKeyChange}>
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MusicKeySelector;
