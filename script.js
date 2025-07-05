const speech = new SpeechSynthesisUtterance();
let voices = [];
let isPaused = false;

const voiceSelect = document.getElementById("voiceSelect");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const pdfUpload = document.getElementById("pdfUpload");
const textArea = document.getElementById("textArea");

// Load voices
function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    setTimeout(populateVoices, 100);
    return;
  }

  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  speech.voice = voices[voiceSelect.value];
}

window.addEventListener("load", () => {
  populateVoices();
  window.speechSynthesis.onvoiceschanged = populateVoices;
});

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Play
playBtn.addEventListener("click", () => {
  speech.text = textArea.value;
  speech.voice = voices[voiceSelect.value];
  window.speechSynthesis.cancel();
  isPaused = false;
  setTimeout(() => {
    window.speechSynthesis.speak(speech);
  }, 100);
});

// Pause
pauseBtn.addEventListener("click", () => {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
    isPaused = true;
  }
});

// Resume
resumeBtn.addEventListener("click", () => {
  if (isPaused && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    isPaused = false;
  }
});

speech.onend = () => {
  isPaused = false;
};

// Handle PDF Upload
pdfUpload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file || file.type !== "application/pdf") {
    alert("Please upload a valid PDF file.");
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = async function () {
    const typedarray = new Uint8Array(this.result);
    const pdf = await pdfjsLib.getDocument(typedarray).promise;

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str).join(" ");
      extractedText += strings + "\n";
    }

    textArea.value = extractedText;
  };

  fileReader.readAsArrayBuffer(file);
});
