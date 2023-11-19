const http = require("http")
const url = require("url")
const sql = require("mssql");

const dbConfig = {
    server: "music-lib-server5.database.windows.net",
    database: "MUSIC_LIB_DB",
    user: "MusicAdmin",
    password: "CoogMusic1!",
    port: 1433
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/api/getArtists') {
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query('SELECT First_Name FROM [Artist]');
            const artists = result.recordset.map(row => row.First_Name);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(artists));
        } catch (error) {
            console.error('Error fetching artists:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } finally {
            sql.close();
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

async function fetchRecommendedArtists() {
    try {
        const response = await fetch('/api/getArtists'); // Updated endpoint
        const data = await response.json();
        return data; // Assuming the data is an array of artist names
    } catch (error) {
        console.error('Error fetching recommended artists:', error);
        return [];
    }
}


/*
async function getUser() {
    let pool;  // Declare the variable outside the try block
    try {
        pool = await sql.connect(dbConfig);  // Use the existing variable
        const result = await pool.request().query("SELECT First_Name FROM [Artist]");
        console.log(result.recordset);
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}


*/