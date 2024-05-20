import React, { createContext, useState, useContext } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [inputMode, setInputMode] = useState("CIRCLE_INPUT"); // or 'CHORD_PRESETS'
  const [selectedNoteIndices, setSelectedNoteIndices] = useState([]);
  const [selectedChordType, setSelectedChordType] = useState("maj");
  return (
    <NotesContext.Provider
      value={{
        inputMode,
        setInputMode,
        selectedNoteIndices,
        setSelectedNoteIndices,
        selectedChordType,
        setSelectedChordType,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
