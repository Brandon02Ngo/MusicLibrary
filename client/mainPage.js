const sql = require("msnodesqlv8");

const connectionString = "DSN=NaimM";
const query = "SELECT * FROM [User]"

sql.query(connectionString, query, (err, rows) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Connected to the database and got rows:", rows);
    }
});

/*

const sql = require("msnodesqlv8");

const connectionString = "DSN=NaimMusic";

// Create a connection to the database using a DSN
sql.open(connectionString, (err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
        // You can now use the 'connection' object to execute queries
    }
});


const sql = require('mssql');


const config = {
    user: 'sa',
    password: 'Axel_sql2023!',
    server: 'localhost',
    port: 1430,
    database: 'music_library',
    pool: {
        max: 10,                        // Max connections at any given time
        min: 0,                         // Min connections
        idleTimeoutMillis: 30000,       // Max time a connection can remain idle before being removed (30s)
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,   // In prod ideally set to false
        connectionTimeout: 15000,       // Time to wait for a connection to DB server before timeout (15s)
        requestTimeout: 15000,          // Time to wait for a DB query request before timeout (15s)
        retryConnectionMax: 3,          // Maximum number of times to retry connecting to the server
        retryConnectionInterval: 1000,  // Interval between retry attempts
        enableArithAbort: true,         // Handles divide by 0 errors / numeric overflows during query execution
        enableArithIgnore: false,       // Causes DB to ignore certain arithmetic errors and to continue executing query despite errors
    },
};


sql.query(connectionString, query, (err, rows) => {
    console.log(rows);
});
// Simulated data (replace with real data from your database)
const songData = {
    song: "apple song", genre: "Rap", rating: "0.0", views: "0"
};

// Sort it out by vies highest to lowest
songData.sort((a,b) => b.views - a.views);

const topTenSongs = songData.slice(0,10);

topTenSongs.forEach((song,index) => {
  //creates html for each song and fills in the data.
  const songElement = document.createElement("div");
  songElement.innerHTML = `
      <h2>${song.song}</h2>
      <p>Genre: ${song.genre}</p>
      <p>Rating: ${song.rating}</p>
      <p>Views: ${song.views}</p>
  `;
  // appends each of the song within the div element
  document.getElementbyID("song-list").appendChild(songElement);
    
});
*/