# from faster_whisper import WhisperModel
# import json
# import sys
# import os

# def main():
#     if len(sys.argv) < 3:
#         raise RuntimeError("Usage: whisper_runner.py <audio_path> <output_file>")

#     audio_path = sys.argv[1]
#     output_file = sys.argv[2]

#     model = WhisperModel("medium", compute_type="int8")


#     segments, info = model.transcribe(
#         audio_path,
#         beam_size=5,
#         language=None
#     )

#     result = []
#     for seg in segments:
#         result.append({
#             "start": seg.start,
#             "end": seg.end,
#             "text": seg.text.strip()
#         })

#     os.makedirs(os.path.dirname(output_file), exist_ok=True)

#     with open(output_file, "w", encoding="utf-8") as f:
#         json.dump(result, f, ensure_ascii=False, indent=2)

#     print(output_file)

# if __name__ == "__main__":
#     main()



from faster_whisper import WhisperModel
import json
import sys
import os

def main():
    if len(sys.argv) < 3:
        raise RuntimeError("Usage: whisper_runner.py <audio_path> <output_file>")

    audio_path = sys.argv[1]
    output_file = sys.argv[2]

    # Medium model + int8 is best for CPU and Hinglish
    model = WhisperModel(
        "medium",
        compute_type="int8",
        device="cpu"
    )

    # IMPORTANT:
    # language=None  → auto-detect (REQUIRED for Hindi + English)
    segments, info = model.transcribe(
        audio_path,
        beam_size=5,
        language=None,
        vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=500),
        condition_on_previous_text=True
    )

    result = []
    for seg in segments:
        result.append({
            "start": round(seg.start, 2),
            "end": round(seg.end, 2),
            "text": seg.text.strip()
        })

    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(output_file)

if __name__ == "__main__":
    main()
