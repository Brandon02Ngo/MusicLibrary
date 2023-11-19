var audio_control = document.getElementById("audio-player"); 
var audio = new Audio("happy-positive-rock-151330.mp3");

function playAudio()
{
  audio.play();
}
function pauseAudio()
{
  audio.pause();
}