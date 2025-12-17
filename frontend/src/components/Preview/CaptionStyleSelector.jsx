import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function CaptionStyleSelector({ value, onChange }) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => newValue && onChange(newValue)}
      fullWidth
    >
      <ToggleButton value="bottom">Bottom</ToggleButton>
      <ToggleButton value="top">Top</ToggleButton>
      <ToggleButton value="karaoke">Karaoke</ToggleButton>
    </ToggleButtonGroup>
  );
}
