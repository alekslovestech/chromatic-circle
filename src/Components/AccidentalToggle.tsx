import React from 'react';
import { useNotes } from './NotesContext';
import { NotationType } from '../types/NotationType';
import { GetAccidentalSign, GetOppositeAccidental } from '../utils/NoteUtils';

const AccidentalToggle: React.FC = () => {
  const { selectedAccidental, setSelectedAccidental } = useNotes();

  const toggleAccidental = () => {
    setSelectedAccidental( GetOppositeAccidental(selectedAccidental));
  };

  return (
    <button onClick={toggleAccidental}>
        {GetAccidentalSign(selectedAccidental, NotationType.ScreenDisplay)}
    </button>
  );
};

export default AccidentalToggle;