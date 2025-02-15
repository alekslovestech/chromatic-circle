import { useNotes } from "../NotesContext";
import { CircularVisMode } from "./CircularVisualizationsSVG";

const CircularVisModeSelect: React.FC = () => {
  const { circularVisMode, selectedNoteIndices, setCircularVisMode } = useNotes();

  const handleDrawingModeChange = (mode: CircularVisMode) => {
    console.log("handleDrawingModeChange", mode);
    setCircularVisMode(mode);
  };

  const visList = [
    {
      mode: CircularVisMode.None,
      label: "No visualization",
    },
    {
      mode: CircularVisMode.Radial,
      label: "Radial style visualization",
    },
    {
      mode: CircularVisMode.Polygon,
      label: "Polygon style visualization",
    },
  ];

  return (
    <div className={`button-group ${selectedNoteIndices.length < 2 ? "invisible" : ""}`}>
      {visList.map(({ mode, label }) => (
        <button
          key={mode}
          className={`viz-button ${circularVisMode === mode ? "selected" : ""}`}
          onClick={() => handleDrawingModeChange(mode)}
          aria-label={label}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fillOpacity="0.4"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mode === CircularVisMode.None ? (
              <circle
                cx="12"
                cy="12"
                r="11"
                stroke={circularVisMode === mode ? "#ffffff" : "#000000"}
                fill="none"
              />
            ) : mode === CircularVisMode.Radial ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.95997 0.243052C7.76448 0.0454515 8.57686 0.537454 8.77446 1.34197L11.471 12.3208L22.4498 15.0173C23.2543 15.2149 23.7463 16.0273 23.5487 16.8318C23.3511 17.6363 22.5387 18.1283 21.7342 17.9307L10.7056 15.222L2.77274 23.3483C2.19406 23.9411 1.24438 23.9525 0.651576 23.3739C0.0587747 22.7952 0.0473328 21.8455 0.62602 21.2527L8.57552 13.1093L5.86105 2.05754C5.66345 1.25303 6.15545 0.440652 6.95997 0.243052Z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.6562 0.125249C7.30754 -0.0701232 6.89846 -0.114884 6.52261 -0.0109949C6.31941 0.0451718 6.12593 0.144789 5.95696 0.287542C5.82363 0.399705 5.70901 0.535699 5.6204 0.691309C5.55112 0.812568 5.50019 0.941305 5.46753 1.07354L-0.0124362 21.518C-0.0510462 21.652 -0.0712217 21.7923 -0.0708334 21.9351C-0.0705617 22.1228 -0.034823 22.3059 0.0315195 22.476C0.106051 22.6682 0.217216 22.8377 0.354608 22.9786C0.62284 23.2536 0.991048 23.4193 1.38184 23.4316C1.54309 23.4369 1.70157 23.4159 1.85198 23.3716L22.7173 17.681C22.8691 17.6428 23.0159 17.5806 23.1517 17.4945C23.4795 17.2873 23.7115 16.9613 23.8046 16.592C23.8967 16.2241 23.8471 15.8287 23.6577 15.4918C23.5799 15.353 23.4816 15.2297 23.3678 15.1247L7.98211 0.371381C7.88642 0.275954 7.77714 0.192787 7.6562 0.125249ZM19.3998 15.4762L7.71596 4.27255L3.5546 19.7976L19.3998 15.4762Z"
              />
            )}
          </svg>
        </button>
      ))}
    </div>
  );
};

export default CircularVisModeSelect;
