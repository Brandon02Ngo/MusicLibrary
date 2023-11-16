// Access node.js's built in http, url, fs, path, and event modules
const http = require('http');
const url = require('url');                                                        // Can be used to split up a web address into readable parts (use q = url.parse(...).query to return a URL object with each part of the address as properties [example address: localhost:8000/default.htm?year=2017&month=february], also has .host [localhost:8000], .pathname [default.htm], and .search [?year=2017&month=february])
const fs = require('fs');                                                          // Will be used to work with file system operations (read, create, update, etc.); needed to dynamically display reports generated by the DB
const path = require('path');                                                      // Used to generate the correct file paths
const sql = require('mssql');                                                      // Used to connect to our Database
const events = require('events');                                                  // Used to create-, fire-, and listen for- our own events (i.e. user likes a song, etc.)

// Here you can include any other built in / user modules as well (think #include <...>)
// const dt = require('./myFirstModule');
const dbConfig = require('./databaseConfig.js');

// Creates a server object
// This is our Route Line ***
const server = http.createServer(async function(req, res) {                                           // req - request from client as an object; res - response from server as an object
//

    var q = url.parse(req.url, true).query;                                      // true - parse query string (part after '?') into object; false - leave it as a string (see line 3)
    var fileName = "." + q.pathname;                                             // Generates file name using url object.pathname method
    var filePath = path.join(__dirname, '..', 'client', fileName);               // Navigates to correct directory and gets correct path to wanted file name

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', req.header?.origin || "*");
    if ( req.method === 'OPTIONS' ) {
        res.writeHead(200);
        res.end();
        return;
    }

    // This is from client submitting data to the database 
    if (req.method === 'POST') {

        // This is if it is the same file as this
        if (fileName === 'musicUpload.html') {
            // Data parsing
            // Data buffer will incrementally collect data sent via request
            let body = '';
            req.on('data', (data) => {
                body += data;
            });

            sql.connect(dbConfig, (err) => {
                if (err) {                                                       // Database connection error handler
                    console.error('Database connection error:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Database connection error');
                    return;                    
                }

                const request = new sql.Request();
                request.query(/* INSERT INTO table_name VALUES(val1, val2, etc.) */'Select 1', (err, result) =>  {
                    if (err) {                                                   // Database query error handler
                        console.error('Database query error:', err);
                        sql.close();
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Database query error');
                        return;
                    }

                    // Process query result and close
                    sql.close();
                })
            })
        }
    }

    // Unsure if best way to go about this, but I know each page will have different queries so need to know name of page here (held in file name)
    // We can create functions / modules outside of this app for better organization maybe
    else if (req.method === 'GET') {
        let pool
        try {
            pool = await sql.connect(dbConfig);  // Use the existing variable
            const result1 = await pool.request().query("SELECT Top 6 Artist FROM [MusicLibrary].[Song];");
            const result2 = await pool.request().query("SELECT TOP 6 Username FROM [MusicLibrary].[User] WHERE Role_ID = 1;");
            const result3 = await pool.request().query("SELECT Username FROM [MusicLibrary].[User] WHERE Role_ID = 3;");
            const result4 = await pool.request().query("SELECT Top 6 Audio_Data FROM [MusicLibrary].[Song];");

            // Send audio data if available
            // if (result4.recordset.length > 0) {
            //     const audioDataList = result4.recordset.map(row => row.Audio_Data);
            //     res.writeHead(200, { 'Content-Type': 'application/json' });
            //     res.end(JSON.stringify({ audioDataList }));
            //}
            res.end(JSON.stringify({
                data1: result1.recordset,
                data2: result2.recordset,
                data3: result3.recordset,
                data4: result4.recordset
            }));
        } catch (error) {
            console.error('Error fetching usernames:', error);
            return [];
        } finally {
            if (pool) {
                pool.close();
            }
        }
    }
    //res.end();                                                                   // Ends the response
})

server.listen(8080, () => {                                                      // Server object listens on this port
  console.log('Server is listening on port 8080');
});
