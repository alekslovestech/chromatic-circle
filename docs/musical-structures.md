```mermaid
classDiagram
    class MusicalKey {
        +String tonicString
        +KeyType classicalMode
        +GreekModeType greekMode
        +KeySignature keySignature
        +ChromaticIndex tonicIndex
        +GreekModeInfo greekModeInfo
        +getScaleDegreeInfoFromChromatic()
        +getNoteInfoFromChromatic()
        +getDisplayString()
    }

    class KeySignature {
        +String tonicString
        +KeyType mode
        +getAccidentals()
        +getDefaultAccidental()
        +applyToNote()
    }

    class GreekModeInfo {
        +GreekModeType type
        +ScalePattern scalePattern
        +getAbsoluteScaleNotes()
        +getScaleDegreeInfoFromChromatic()
    }

    class ScalePattern {
        +Number[] pattern
        +addOffsetsChromatic()
        +getOffsets135()
    }

    class ScaleDegreeInfo {
        +ScaleDegree scaleDegree
        +AccidentalType accidentalPrefix
        +getDisplayString()
    }

    class NoteInfo {
        +String noteName
        +AccidentalType accidental
        +formatNoteNameForDisplay()
    }

    class RomanChord {
        +ScaleDegreeIndex scaleDegreeIndex
        +ChordType chordType
        +AccidentalType accidental
    }

    class NoteGrouping {
        +NoteGroupingId id
        +String lettersId
        +String symbolsId
        +String displayName
        +OffsetIndex[] offsets
        +OffsetIndex[][] inversions
    }

    class ChordUtils {
        +getMatchFromIndices(ActualIndex[]) 
        +getDisplayInfoFromIndices(ActualIndex[], ChordDisplayMode, MusicalKey) 
        +getOffsetsFromIdAndInversion(NoteGroupingId, InversionIndex) 
        +calculateChordNotesFromIndex(ActualIndex, NoteGroupingId, InversionIndex) 
        +deriveChordName(IChordMatch, ChordDisplayMode, MusicalKey) 
    }

    class IndexUtils {
        +normalizeIndices(Number[]) Number[]
        +fitChordToAbsoluteRange(Number[]) Number[]
        +rootNoteAtInversion(ActualIndex[], InversionIndex) ActualIndex
        +areIndicesEqual(Number[], Number[]) Boolean
        +ToggleNewIndex(ActualIndex[], ActualIndex) ActualIndex[]
    }

    class IChordMatch {
        <<interface>>
        +ActualIndex rootNote
        +NoteGrouping definition
        +InversionIndex inversionIndex
    }

    class DisplayInfo {
        +String noteGroupingString
        +String chordName
    }

    MusicalKey "1" *-- "1" KeySignature
    MusicalKey "1" *-- "1" GreekModeInfo
    GreekModeInfo "1" *-- "1" ScalePattern
    MusicalKey "1" *-- "0..*" ScaleDegreeInfo
    MusicalKey "1" *-- "0..*" NoteInfo
    RomanChord "1" *-- "1" ScaleDegreeInfo
    NoteGrouping "1" *-- "0..*" OffsetIndex
    ChordUtils ..> IChordMatch : returns
    ChordUtils ..> NoteGrouping : uses
    ChordUtils ..> IndexUtils : uses
    ChordUtils ..> DisplayInfo : returns

    class KeyType {
        <<enumeration>>
        Major
        Minor
    }

    class GreekModeType {
        <<enumeration>>
        Ionian
        Dorian
        Phrygian
        Lydian
        Mixolydian
        Aeolian
        Locrian
    }

    class AccidentalType {
        <<enumeration>>
        None
        Sharp
        Flat
        Natural
    }

    class ChordType {
        <<enumeration>>
        Major
        Minor
        Diminished
        Augmented
    }
```;
