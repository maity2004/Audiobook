# Audiobook
This project turns any **text or PDF file into speech**, creating a simple audiobook experience right in the browser. It uses the Web Speech API for voice synthesis and PDF.js for extracting text from PDF documents.

## 🚀 Features
- 📝 **Text-to-Speech**: Enter text manually or paste it into the textarea.
- 📄 **PDF Upload**: Extracts text from uploaded PDFs.
- 🎙️ **Voice Selection**: Choose from available system voices (English, Hindi, etc.).
- ▶️ ⏸️ 🔁 **Playback Controls**: Play, pause, and resume speech.
- 📱 **Responsive Design**: Works on both desktop and mobile.
- 🎨 Clean and dark-themed UI for a comfortable reading/listening experience.

## 🛠️ How to Use
1. **Open `index.html`** in your browser (double-click or right-click → open with browser).
2. **Choose one of two options**:
   - 📄 Upload a `.pdf` file using the **Choose File** button (top-left of the text area).
     - Extracted text will automatically fill the textarea.
   - ✍️ Or, manually **type or paste** text directly into the textarea.

3. **Select a voice** from the dropdown (you’ll see options like “Google US English”, “Google हिन्दी”, etc.).
4. **Control playback** using:
   - ▶️ **Play** – starts reading the text aloud.
   - ⏸️ **Pause** – pauses the speech at any point.
   - 🔁 **Resume** – resumes from where it left off (some voices/languages may not support this).


## Built With
- HTML5 / CSS3
- JavaScript (ES6)
- Web Speech API
- PDF.js
