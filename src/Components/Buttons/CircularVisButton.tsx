import { CircularVisMode } from "../../types/SettingModes";
import { Button } from "../Common/Button";

interface VisButtonProps {
  mode: CircularVisMode;
  label: string;
  isDisabled?: boolean;
}

export const CircularVisButton: React.FC<VisButtonProps> = ({
  mode,
  label,
  isDisabled,
  ...buttonProps
}) => {
  return (
    <Button variant="vis" size="sm" selected={false} disabled={isDisabled} {...buttonProps}>
      <svg>{/* ... */}</svg>
    </Button>
  );
};
