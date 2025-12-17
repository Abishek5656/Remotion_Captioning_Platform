import sys
import os
import json
from faster_whisper import WhisperModel


def main():
    if len(sys.argv) != 3:
        print(
            "Usage: whisper_runner.py <audio_path> <output_file>",
            file=sys.stderr
        )
        sys.exit(1)

    audio_path = os.path.abspath(sys.argv[1])
    output_file = os.path.abspath(sys.argv[2])

    if not os.path.exists(audio_path):
        print(f"Audio file not found: {audio_path}", file=sys.stderr)
        sys.exit(1)

    try:
        model = WhisperModel(
            "medium",
            device="cpu",
            compute_type="int8"
        )

        segments, _ = model.transcribe(
            audio_path,
            beam_size=5,
            language=None,  # Hinglish auto-detect
            vad_filter=True,
            vad_parameters={"min_silence_duration_ms": 500},
            condition_on_previous_text=True
        )

        result = [
            {
                "start": round(seg.start, 2),
                "end": round(seg.end, 2),
                "text": seg.text.strip()
            }
            for seg in segments
        ]

        os.makedirs(os.path.dirname(output_file), exist_ok=True)

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

        # IMPORTANT: stdout must only contain output path
        print(output_file)
        sys.exit(0)

    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
