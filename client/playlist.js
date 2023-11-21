function playAudio()
{
  //replace string with stuff pointing to the DB
  var audio_control = document.getElementById("audio-player"); 
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  if (file) {
    var objectURL = URL.createObjectURL(file);
    audio_control.src = objectURL;
    audio_control.play();
  }
}
function pauseAudio()
{
    var audio_control = document.getElementById("audio-player"); 
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
      var objectURL = URL.createObjectURL(file);
      audio_control.src = objectURL;
      audio_control.pause();
    }

}