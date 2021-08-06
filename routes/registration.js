const express = require('express');
const router = express.Router();
const database = require('../model/database');

router.post("/registration", function (req, res) {


    let sqlQuery = "INSERT INTO `users`(`name`, `phone`, `email`, `password`) VALUES (? , ?, ?, ?)";

    con.query(sqlQuery, [req.body.name, req.body.phone, req.body.email, req.body.password], function (err, rows) {

        if (err) {
            console.log(err);
        } else {
            console.log("Registered");
        }
    });

});

module.exports = router;