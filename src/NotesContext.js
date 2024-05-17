import React, { createContext, useState, useContext } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [mode, setMode] = useState("CIRCLE_INPUT"); // or 'CHORD_PRESETS'

  const updateNotes = (newNotes) => {
    setNotes(newNotes);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <NotesContext.Provider value={{ notes, updateNotes, mode, switchMode }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
