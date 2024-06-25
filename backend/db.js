let sqlite3 = require('sqlite3').verbose();
const dbname = "cosc4415db.db";

let myDB =  null;

const prepareDB = (dbname) => {
    return new sqlite3.Database(`./${dbname}`, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
}

myDB = prepareDB(dbname);

module.exports = myDB;