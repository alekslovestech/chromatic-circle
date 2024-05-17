import React, { createContext, useState, useContext } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [mode, setMode] = useState("CIRCLE_INPUT"); // or 'CHORD_PRESETS'
  const [selectedNoteIndices, setSelectedNoteIndices] = useState([]);

  return (
    <NotesContext.Provider
      value={{
        mode,
        setMode,
        selectedNoteIndices,
        setSelectedNoteIndices,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
