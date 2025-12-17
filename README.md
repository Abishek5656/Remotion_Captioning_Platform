# 🎬 Remotion Auto-Captioning Platform

A full-stack web application that allows users to upload videos, automatically generate captions using speech-to-text (STT), and render those captions directly onto the video using **Remotion**.

The application is deployed live and supports **Hinglish captions**, async processing, and scalable rendering.

---

## 🚀 Live Demo

- **Frontend:**   
- **Backend API:** 
- **GitHub Repository:** https://github.com/Abishek5656/Remotion_Captioning_Platform.git
- **Project demo:** https://drive.google.com/file/d/154AvSPBcRkbr2ZiiZlrTl51mheW3DeKY/view

---

## 🧠 Features

- Upload `.mp4` videos
- Extract audio using **FFmpeg**
- Auto-generate captions using **Whisper STT**
- Support for **English & Hinglish**
- Render captions on video using **Remotion**
- Async processing pipeline
- Download final captioned video

---

## 🛠 Tech Stack

### Frontend
- React + Vite
- Material UI
- Axios
- Remotion Player

### Backend
- Node.js + Express
- FFmpeg (audio extraction)
- Python + Whisper (speech-to-text)
- Remotion Renderer
- Multer (file uploads)

### AI / Media
- Whisper (local or API)
- Remotion (video rendering)

---

## 📁 Project Structure

project-root/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ └── App.jsx
│ └── vite.config.js
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── services/
│ │ ├── ffmpeg.service.js
│ │ ├── whisper.service.js
│ │ └── remotion.service.js
│ ├── uploads/
│ ├── captions/
│ └── server.js
│
├── remotion/
│ ├── compositions/
│ ├── CaptionVideo.jsx
│ └── index.js
│
└── README.md


---

## 🔄 Processing Pipeline

1. User uploads a video (`.mp4`)
2. Backend stores the video and generates a `videoId`
3. FFmpeg extracts audio (`.wav`)
4. Whisper converts audio → captions (`.json`)
5. Captions are passed to Remotion
6. Remotion renders the final video
7. User downloads the captioned video

---

## ⚙️ Environment Variables

### Backend (`.env`)






---

## ▶️ Running Locally

### 1️⃣ Clone Repository
```bash

git clone https://github.com/your-username/remotion-captioning.git
cd remotion-captioning

### 2️⃣ Backend Setup

cd backend
npm install
npm start

3️⃣ Python Whisper Setup

🔑 PYTHON_PATH

Specifies the absolute path to the Python executable on your system that is used to run the Whisper speech-to-text model.

python -m venv env
source env/bin/activate   # Windows: env\Scripts\activate
pip install faster-whisper torch ffmpeg-python numpy

Python 3.10.9 recommended.

4️⃣ Frontend Setup

cd frontend
npm install
npm run dev

🧪 Sample Caption Format

{
    "videoId": "51a53819-7f8e-4b99-a58b-4743b4352623",
    "language": "auto-detected (Hindi + English)",
    "segmentCount": 8,
    "segments": [
        {
            "start": 0.34,
            "end": 2.34,
            "text": "हाई अम अबिशेक वर्मा"
        },
        {
            "start": 2.34,
            "end": 5.2,
            "text": "मेरे को दो साल का एक्स्पिरेंस है"
        },
        {
            "start": 5.2,
            "end": 7.2,
            "text": "सॉफ्वेर इंडिस्ट्री में"
        },
        {
            "start": 7.2,
            "end": 9.2,
            "text": "अभी में इंड्रो लैब्स में"
        },
        {
            "start": 9.2,
            "end": 11.77,
            "text": "अजे सीनियर"
        },
        {
            "start": 11.77,
            "end": 13.77,
            "text": "फूल स्टैक डवलप्र कर रोल में"
        },
        {
            "start": 13.77,
            "end": 15.77,
            "text": "काम कर रहा हूं"
        },
        {
            "start": 15.77,
            "end": 17.77,
            "text": "में अभी"
        }
    ],
    "status": "transcription_completed"
}
---
👤 Author

Penmetsa Surya Abishek Varma
Full-Stack Developer
📧 abishekvarma8929@gmail.com



