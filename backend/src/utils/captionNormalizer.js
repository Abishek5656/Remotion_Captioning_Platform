/**
 * Normalize raw STT segments into render-safe captions
 */
export function normalizeCaptions(segments) {
  const captions = [];

  for (const segment of segments) {
    let text = segment.text
      .replace(/\s+/g, " ")
      .replace(/[.,!?]+$/, "")
      .trim();

    if (!text) continue;

    const duration = segment.end - segment.start;

    // Split long captions (readability)
    if (text.length > 40) {
      const mid = Math.floor(text.length / 2);
      const splitIndex = text.lastIndexOf(" ", mid);

      const first = text.slice(0, splitIndex).trim();
      const second = text.slice(splitIndex).trim();

      const half = duration / 2;

      captions.push({
        start: round(segment.start),
        end: round(segment.start + half),
        text: first,
      });

      captions.push({
        start: round(segment.start + half),
        end: round(segment.end),
        text: second,
      });
    } else {
      captions.push({
        start: round(segment.start),
        end: round(segment.end),
        text,
      });
    }
  }

  return captions;
}

function round(value) {
  return Math.round(value * 100) / 100;
}
