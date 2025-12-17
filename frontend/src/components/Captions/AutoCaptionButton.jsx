import { Button } from "@mui/material";
import { memo } from "react";

function AutoCaptionButton({ onClick, disabled }) {
  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      disabled={disabled}
      onClick={onClick}
    >
      Auto-Generate Captions
    </Button>
  );
}

export default memo(AutoCaptionButton);
