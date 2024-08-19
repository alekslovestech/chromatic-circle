# chromatic-circle

Chromatic circle visualizations

State propagation:
SelectedNotes => PianoKeyboard
=> ChromaticCircle
=> NotesRenderer

Various formats:

Global state: current key, preferred accidental.
noteIndex => NoteAndAccidental => note in text
noteIndex => NoteAndAccidental => note in vex / easyScore => NoteRenderer
