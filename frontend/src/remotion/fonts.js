import { loadFont as loadLatin } from "@remotion/google-fonts/NotoSans";
import { loadFont as loadDeva } from "@remotion/google-fonts/NotoSansDevanagari";

export const fontFamily = [
  loadLatin(),
  loadDeva(),
].join(", ");
