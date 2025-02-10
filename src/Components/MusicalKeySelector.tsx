import React from "react";
import { useNotes } from "./NotesContext";
import { KeyType, MusicalKey, MusicalKeyUtil } from "../types/MusicalKey";

const MusicalKeySelector: React.FC = () => {
  const { setSelectedAccidental, setSelectedMusicalKey } = useNotes();

  const [isMajor, setIsMajor] = React.useState(true);
  const [localKey, setLocalKey] = React.useState<string>("C");
  const keys = MusicalKeyUtil.getKeyList(isMajor ? KeyType.Major : KeyType.Minor);

  React.useEffect(() => {
    const newKey = new MusicalKey(localKey, getMajorMinorString(isMajor));
    console.log("newKey", newKey);
    setSelectedMusicalKey(newKey);
    setSelectedAccidental(newKey.getDefaultAccidental());
  }, [isMajor, localKey, setSelectedMusicalKey, setSelectedAccidental]);

  const getMajorMinorString = (isMajor: boolean) => {
    return isMajor ? KeyType.Major : KeyType.Minor;
  };

  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    setLocalKey(key);
  };

  const handleMajorToggle = () => {
    setIsMajor((prevIsMajor) => !prevIsMajor);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={handleMajorToggle} style={{ marginRight: "10px" }}>
        {isMajor ? ":)" : ":("}
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

export default MusicalKeySelector;
