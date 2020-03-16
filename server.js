var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

var tables = []
var waiting = []

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "rsvp.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.post("/api/tables", function (req, res) {
    var newTable = req.body;
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
    if (tables.length < 5) {
        tables.push(newTable);
    } else {
        waiting.push(newTable);
    }
    console.log(tables);
    console.log(waiting);
    res.json(newTable);
});

app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/waiting", function (req, res) {
    return res.json(waiting);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});