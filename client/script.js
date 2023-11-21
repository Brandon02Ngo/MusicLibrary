document.addEventListener('DOMContentLoaded', async () => {
    fetch('/getAudioData',{method: 'GET'}).then(x => x.json()).then( x => {
        const audioPlayer = document.getElementById('audio-player');
    })
})