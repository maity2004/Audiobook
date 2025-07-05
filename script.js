const speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

// Load and populate all available voices
function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  // If voices haven't loaded yet, retry after delay
  if (voices.length === 0) {
    setTimeout(populateVoices, 100);
    return;
  }

  voiceSelect.innerHTML = ""; // Clear previous

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  // Set default voice
  if (voiceSelect.options.length > 0) {
    speech.voice = voices[voiceSelect.value];
  }
}

// Ensure voices are loaded on page ready
window.addEventListener("load", () => {
  populateVoices();
  window.speechSynthesis.onvoiceschanged = populateVoices;
});

// Change voice on selection
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Speak
playBtn.addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.cancel(); // Reset any ongoing speech
  window.speechSynthesis.speak(speech);
});

// Pause
pauseBtn.addEventListener("click", () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
});

// Resume
resumeBtn.addEventListener("click", () => {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
});
