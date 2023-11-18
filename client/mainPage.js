document.addEventListener('DOMContentLoaded', async () => {
    fetch("http://localhost:8080/").then(x => x.json()).then( x => {
        const userList = document.getElementById('Recommended');
        
    // Loop through the array and create list items for each username
    x.data2.forEach(user => {
        // Create a new LI element
        const listItem = document.createElement('li');
        listItem.classList.add("song-item");
    
        // Create a new LI element
        const artistBox = document.createElement('div');
        artistBox.classList.add("Rec-box");
    
        // Create a new div for the artist info
        const artistInfo = document.createElement('div');
        artistInfo.classList.add("song-info");

        // Create an H2 element for the artist name
        const artistName = document.createElement('h2');
        artistName.textContent = user["Username"];

        // Create a new A element
        const anchorElementRec = document.createElement('a');
        anchorElementRec.href = "playlist.html"; // Set the href attribute

        //Anchor the artist Name
        anchorElementRec.appendChild(artistName);

        //assign the name to each box with the anchor
        artistInfo.appendChild(anchorElementRec);

        // Append the artist box, info, and name to the LI element
        listItem.appendChild(artistBox);
        listItem.appendChild(artistInfo);

        // Append the LI element to the UL
        userList.appendChild(listItem);

        });
    });
    fetch("http://localhost:8080/").then(y => y.json()).then( y => {
        const userlist = document.getElementById('new-releases');
        
    // Loop through the array and create list items for each username
    y.data1.forEach(peeps => {

        // Create a new LI element
        const listitem = document.createElement('li');
        listitem.classList.add("song-item");

        // Create a new LI element
        const artistbox = document.createElement('div');
        artistbox.classList.add("NR-box");
    
        // Create a new div for the artist info
        const artistinfo = document.createElement('div');
        artistinfo.classList.add("song-info");

        // Create an H2 element for the artist name
        const artistname = document.createElement('h2');
        artistname.textContent = peeps["Artist"];

        // Create a new A element
        const anchorElement = document.createElement('a');
        anchorElement.href = "playlist.html"; // Set the href attribute

        //Store the audio data as a variable within the box.
        anchorElement.dataset.Audio_Data = JSON.stringify(peeps['Audio_Data']);

        // Append the artist name to the anchor element
        anchorElement.appendChild(artistname);

        // Append the anchor element to the artist info
        artistinfo.appendChild(anchorElement);

        // Append the artist box, info, and name to the LI element
        listitem.appendChild(artistbox);
        listitem.appendChild(artistinfo);

        // Append the LI element to the UL
        userlist.appendChild(listitem);

        });
    });
});

// const ctx = new AudioContext();

// // Fetch audio data from the server
// fetch('http://localhost:8080')
//   .then(response => response.json())
//   .then(audioDataList => {
//     audioDataList.forEach(audioData => {
//       ctx.decodeAudioData(audioData).then(buffer => {
//         const audio = new AudioBufferSourceNode(ctx, { buffer });
//         audio.connect(ctx.destination);
//         audio.start();
//       });
//     });
//   })
//   .catch(error => console.error('Error fetching and decoding audio:', error));


