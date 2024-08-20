import React from 'react';
import { useNotes } from './NotesContext';
import { getChordName, getNoteTextFromIndex } from '../utils/ChromaticUtils';

const ChordDisplay: React.FC = () => {
  const {
    selectedNoteIndices,
    selectedChordType,
    selectedAccidental,
  } = useNotes();

  return (
    <div>
      <div>
        chord:{' '}
        {selectedNoteIndices.length === 0
          ? 'UNKNOWN'
          : getChordName(
              selectedNoteIndices[0],
              selectedChordType,
              selectedAccidental
            )}
      </div>
      <div>
        notes:{' '}
        {selectedNoteIndices
          .map((index) => getNoteTextFromIndex(index, selectedAccidental))
          .join('-')}
      </div>
    </div>
  );
};

export default ChordDisplay;