import React, { createContext, useState, useContext } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [mode, setMode] = useState("CIRCLE_INPUT"); // or 'CHORD_PRESETS'

  const updateNotes = (newNotes) => {
    console.log(`updating notes to ${newNotes}`);
    setNotes(newNotes);
  };

  const switchMode = (newMode) => {
    console.log(`switching mode to ${newMode}`);
    setMode(newMode);
  };

  return (
    <NotesContext.Provider value={{ notes, updateNotes, mode, switchMode }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
