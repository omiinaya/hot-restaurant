var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

var tables = []

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "rsvp.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html

    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTable);
  
    tables.push(newTable);
  
    res.json(newTable);

});

app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});