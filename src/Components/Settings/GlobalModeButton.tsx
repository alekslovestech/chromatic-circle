import { GlobalMode, useGlobal } from "../../contexts/GlobalContext";

export const GlobalModeButton: React.FC = () => {
  const { globalMode, setGlobalMode } = useGlobal();
  return (
    <button
      className="clear-button"
      onClick={() => {
        const oppositeMode =
          globalMode === GlobalMode.Default ? GlobalMode.Advanced : GlobalMode.Default;
        setGlobalMode(oppositeMode);

        // Update URL and reload page
        if (oppositeMode === GlobalMode.Default) {
          window.location.href = "/";
        } else {
          window.location.href = "/?mode=advanced";
        }
      }}
    >
      {globalMode === GlobalMode.Default ? "Switch to Scale Preview Mode" : "Switch to Basic Mode"}
    </button>
  );
};
