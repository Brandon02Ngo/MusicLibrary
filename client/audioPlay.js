const ctx = new AudioContext();
let audio;

window.location.href = `playlist.html?audioData=${encodeURIComponent(audioDataString)}`;

const urlParams = new URLSearchParams(window.location.search);
const audioDataString = urlParams.get('audioData');

const binaryAudioData = atob(audioDataString);
