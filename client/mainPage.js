const sql = require("mssql");

const dbConfig = {
    server: "music-lib-server5.database.windows.net",
    database: "MUSIC_LIB_DB",
    user: "MusicAdmin",
    password: "CoogMusic1!",
    port:1433

};

async function getUser() {
    let pool
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query("SELECT * FROM [User]");

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