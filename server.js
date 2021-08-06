'use strict';
var port = process.env.PORT || 1337;
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//database
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

//registration
app.post("/registration", function (req, res) {

    
    let sqlQuery = "INSERT INTO `users`(`name`, `phone`, `email`, `password`) VALUES (? , ?, ?, ?)";

    con.query(sqlQuery, [req.body.name, req.body.phone, req.body.mail, req.body.password], function (err, rows) {

        if (err) {
            console.log(err);
        } else {
            console.log("Registered");
            res.json("Registered");
            
        }
    });

});

//notesadd
app.post("/addnotes", function (req, res) {


    let sqlQuery = "INSERT INTO `notes`( `userID`, `title`, `time`, `date`, `note`) VALUES (?, ?, ?, ?, ?)";

    con.query(sqlQuery, [req.body.userID, req.body.title, req.body.time, req.body.date, req.body.note], function (err, rows) {

        if (err) {
            console.log(err);
        } else {
            //console.log("inserted");

            res.json("inserted");

        }
    });

});


//deletenotes
app.post("/deletenotes", function (req, res) {


    let sqlQuery = "DELETE FROM notes WHERE noteID = ?";

    con.query(sqlQuery, [req.body.noteID], function (err, rows) {

        if (err) {
            console.log(err);
        } else {

            res.json("deleted");

        }
    });

});


//updatenotes
app.put("/updatenotes", function (req, res) {

    let id = req.body.noteID;
    let n_title = req.body.title;
    let n_note = req.body.note;

    let sqlQuery = "UPDATE `notes` SET title= ?, note= ? WHERE noteID = ?";

    con.query(sqlQuery, [req.body.title, req.body.note, req.body.noteID], function (err, rows) {

        if (err) {
            console.log(err);
        } else {
            console.log(rows.affectedRows);
            res.json("updated");

        }
    });

});

app.get("/getnotes", function (req, res) {

    let sqlQuery = "SELECT `noteID`, `title`, `time`, `date`, `note` FROM `notes` where userID = ? ORDER BY noteID DESC";

    con.query(sqlQuery, [req.query.userID], function (err, rows) {
        if (err) {
            res.json("message", "Not Found");
        } else {

            var data = JSON.parse(JSON.stringify(rows) || null)
            //console.log(data)
            res.json(data);

        }
    });
});

app.get("/login", function (req, res) {
    
    let sqlQuery = "SELECT `userID` FROM `users` where phone = ? and password = ?";

    con.query(sqlQuery, [req.query.phone, req.query.password], function (err, rows) {
        if (err) {
            res.json("message","Not Found");
        } else {
            
            var data = JSON.parse(JSON.stringify(rows[0]) || null)
            //console.log(data)
            res.json(data);
           
        }
    });
});



app.get("/profile", function (req, res) {

    let sqlQuery = "SELECT `name`, `phone`, `email` FROM `users` where userID= ? ";

    con.query(sqlQuery, [req.query.userID], function (err, rows) {
        if (err) {
            res.json("message", "Not Found");
        } else {

            var data = JSON.parse(JSON.stringify(rows[0]) || null)
            //console.log(data)
            res.json(data);

        }
    });
});

app.use("/", function (req, res) {

    /*let sqlQuery = "SELECT `name`, `phone`, `email` FROM `users`";

    con.query(sqlQuery, function (err, rows) {

        if (err) {
            console.log(err);
        } else {
            res.json( rows );
        }

    });*/

    res.json("Daily Notes");
    
});

app.listen(port);



