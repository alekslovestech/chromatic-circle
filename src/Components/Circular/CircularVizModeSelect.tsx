import { CartesianPoint, PolarMath } from "../../utils/PolarMath";
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

  const getStroke = (mode: CircularVisMode) => (circularVisMode === mode ? "#ffffff" : "#000000");

  class CircularVizIcons {
    readonly innerRadius = 11;
    private readonly circleRadius = 12;
    readonly circleDiameter = 2 * this.circleRadius;

    constructor() {
      this.center = {
        x: this.circleRadius,
        y: this.circleRadius,
      };
      this.Bcoor = PolarMath.getCartesianFromPolarWithOffset(
        this.center,
        this.innerRadius,
        this.Bangle,
        true,
      );
      this.Ebcoor = PolarMath.getCartesianFromPolarWithOffset(
        this.center,
        this.innerRadius,
        this.Ebangle,
        true,
      );
      this.Gcoor = PolarMath.getCartesianFromPolarWithOffset(
        this.center,
        this.innerRadius,
        this.Gangle,
        true,
      );
      this.Ocoor = PolarMath.getCartesianFromPolarWithOffset(this.center, 0, 0, true);
    }

    getCirclePoints = (mode: CircularVisMode) => (
      <circle
        cx={this.circleRadius}
        cy={this.circleRadius}
        r={this.innerRadius}
        stroke={getStroke(mode)}
        fill="none"
        strokeWidth="1"
      />
    );

    getRadialPoints = (mode: CircularVisMode) => (
      <polyline
        points={`${this.Ocoor.x},${this.Ocoor.y} ${this.Bcoor.x},${this.Bcoor.y} ${this.Ocoor.x},${this.Ocoor.y} ${this.Ebcoor.x},${this.Ebcoor.y} ${this.Ocoor.x},${this.Ocoor.y} ${this.Gcoor.x},${this.Gcoor.y} ${this.Ocoor.x},${this.Ocoor.y}`}
        fill="none"
        stroke={getStroke(mode)}
        strokeWidth="2"
      />
    );

    getPolygonPoints = (mode: CircularVisMode) => (
      <polygon
        points={`${this.Bcoor.x},${this.Bcoor.y} ${this.Ebcoor.x},${this.Ebcoor.y} ${this.Gcoor.x},${this.Gcoor.y}`}
        fill="none"
        stroke={getStroke(mode)}
        strokeWidth="2"
      />
    );

    private readonly Bangle = (375 * Math.PI) / 180;
    private readonly Ebangle = (135 * Math.PI) / 180;
    private readonly Gangle = (255 * Math.PI) / 180;
    private readonly center: CartesianPoint;
    private readonly Bcoor: CartesianPoint;
    private readonly Ebcoor: CartesianPoint;
    private readonly Gcoor: CartesianPoint;
    private readonly Ocoor: CartesianPoint;
  }

  const visIcons = new CircularVizIcons();

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
            width={visIcons.circleDiameter}
            height={visIcons.circleDiameter}
            viewBox={`0 0 ${visIcons.circleDiameter} ${visIcons.circleDiameter}`}
            fillOpacity="0.4"
            xmlns="http://www.w3.org/2000/svg"
          >
            {visIcons.getCirclePoints(mode)}
            {mode === CircularVisMode.Radial && visIcons.getRadialPoints(mode)}
            {mode === CircularVisMode.Polygon && visIcons.getPolygonPoints(mode)}
          </svg>
        </button>
      ))}
    </div>
  );
};

export default CircularVisModeSelect;
