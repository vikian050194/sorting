const port = process.env.PORT || 8080;

const express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies,

app.use(express.static("client"));

var router = require("./router");
app.use("/", router);

app.listen(port, function () {
    console.log("Listening on port " + port);
});