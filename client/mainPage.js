document.addEventListener('DOMContentLoaded', async () => {
    fetch('/getDatafromDB',{method: 'GET'}).then(x => x.json()).then( x => {
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
        artistName.classList.add("title")
        artistName.textContent = user["Artist"];

        // Create a new A element
        const anchorElementRec = document.createElement('a');
        anchorElementRec.href = `playlist.html?Artist=${user['Artist']}`; // Set the href attribute

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

    fetch('/getDatafromDB',{method: 'GET'}).then(y => y.json()).then( y => {
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
        artistname.classList.add("title")
        artistname.textContent = peeps["Title"];

        // Create a new A element
        const anchorElement = document.createElement('a');
        anchorElement.href = `playlist.html?Song_ID=${peeps['Song_ID']}`; // Set the href attribute

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

    fetch('/getDatafromDB', { method: 'GET' })
    .then(z => z.json())
    .then(z => {
        const Tplist = document.getElementById('songlist');

    // Loop through the array and create list items for each record
    z.data3.forEach(TopPicks => {

        // Create a new LI element
        const TPlistitem = document.createElement('li');
        TPlistitem.classList.add("song-item2");

        // Create a new LI element
        const TPartistbox = document.createElement('div');
        TPartistbox.classList.add("TP-box");

        // Create a new div for the song info
        const TPartistinfo = document.createElement('div');
        TPartistinfo.classList.add("song-info");

        // Create an H2 element for the song title
        const TPartistname = document.createElement('h2');
        TPartistname.classList.add("title");
        TPartistname.textContent = TopPicks["Title"]; // Assuming "Title" is the correct property name

        // Create a new span element for Genre
        const TPGenre = document.createElement('span');
        TPGenre.classList.add("song-genre");
        TPGenre.textContent = ("Genre: " + TopPicks["Genre"]);

        // Create a new span element for song views
        const TPsongViews = document.createElement('span');
        TPsongViews.classList.add("song-views");
        TPsongViews.textContent = ("Listens: " + TopPicks["Listens"]);

        // Create a new A element
        const TPanchorElement = document.createElement('a');
        TPanchorElement.href = "playlist.html";
        TPanchorElement.href = `playlist.html?Song_ID=${TopPicks['Song_ID']}`;

        // Append the song title to the anchor element
        TPanchorElement.appendChild(TPartistname);

        // Append the anchor element and song views to the song info
        TPartistinfo.appendChild(TPanchorElement);
        TPartistinfo.appendChild(TPGenre);
        TPartistinfo.appendChild(TPsongViews);

        //Append the TP-box into listItem
        TPartistbox.appendChild(TPartistinfo);

        // Append the song info to the LI element
        TPlistitem.appendChild(TPartistbox);
        TPlistitem.appendChild(TPartistinfo);

        // Append the LI element to the UL
        Tplist.appendChild(TPlistitem);

    });
  });
  const event = new Event('scriptsFinished');
  document.dispatchEvent(event);
});

// On the source page (e.g., index.html)
// document.addEventListener('DOMContentLoaded', function() {
//     // Find all elements with the class 'song-box'
//     const songCode = document.querySelectorAll('.song-code');
  
//     // Attach a click event listener to each song box
//     songCode.forEach(box => {
//       box.addEventListener('click', function(event) {
//         // Prevent the default behavior of the link
//         event.preventDefault();
  
//         // Retrieve the audio data from the data attribute
//         const audioCode = box.dataset.audioCode;
  
//         // Navigate to the playlist page and pass the audio data as a parameter
//         window.location.href = `audioPlay.js?audioCode=${encodeURIComponent(audioCode)}`;
//       });
//     });
//   });
  
//'/mainPagelist'

