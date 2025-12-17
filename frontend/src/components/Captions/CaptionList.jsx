import { Box } from "@mui/material";
import { useMemo } from "react";
import CaptionItem from "./CaptionItem";

export default function CaptionList({ captions }) {
  const items = useMemo(
    () =>
      captions.map((cap, index) => (
        <CaptionItem key={index} caption={cap} />
      )),
    [captions]
  );

  return (
    <Box
      sx={{
        maxHeight: 280,
        overflowY: "auto",
        border: "1px solid #eee",
        borderRadius: 1,
        p: 1,
      }}
    >
      {items}
    </Box>
  );
}
