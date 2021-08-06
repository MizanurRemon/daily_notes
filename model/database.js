const mysql = require('mysql');


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "daily_notes"
});

con.connect(function (err) {

    if (err) {
        console.log("Connection Error");
    } else {
        console.log("Connected");
    }
});