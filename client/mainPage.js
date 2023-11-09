const http = require('http')
const url = require('url')
const sql = require("mssql");

const dbConfig = {
    server: "music-lib-server5.database.windows.net",
    database: "MUSIC_LIB_DB",
    user: "MusicAdmin",
    password: "CoogMusic1!",
    port:1433

};
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if(req.method === 'GET' && parsedUrl.pathname === '/api/getArtists') {
        sql.connect(dbConfig, (err) => {
            if (err) {
                console.error('Error connecting to the database:', err);
                res.writeHead(500, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'Database error'}));
                return;
            }

            const request = new sql.Request();
            request.query('SELECT * FROM [Artist]', (queryErr,result) => {
                if (queryErr) {
                    console.error('Error executing the query:', queryErr);
                    res.writeHead(500, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: 'Database Query Error'}));
                    sql.close();
                    return;
                }
                const artist = result.recordset.map((row) => row.ArtistName);

                res.writeHead(200, {'Content-type': 'text/plain' });
                res.end(JSON.stringify(artist));
                sql.close();
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

//start the server
const port = 3000;
//const httpServer = server.listen(port, () => {
//    console.log(`Server is running on port ${port}`);
//  });

const httpServer = server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  
});


  

/*
async function getUser() {
    let pool
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query("SELECT * FROM [Artist]");

        console.log(result.recordset);
    } catch (err) {
        console.error(err);
    } finally {
        if (pool) {
            pool.close();
        }
    }
}

getUser();
*/

