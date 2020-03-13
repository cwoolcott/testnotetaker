var http = require("http");
var express = require("express");
var app = express();
var apiRoutes = require("./routes/apiRoutes")
var htmlRoutes = require("./routes/htmlRoutes")
const path = require('path');

const PORT = process.env.PORT || 8080;

// ESTABLISHING EXPRESS ROUTE
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
    console.log(err);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// ACTUAL ROUTES
app.use("/api", apiRoutes)

app.use("/", htmlRoutes)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, function () {
    console.log("Server is ready to listen on port: " + PORT);
})