//require('./src/weather-bot');
var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');
var app = express();
var mysql = require('mysql');
const config = require('./src/utils/config');
var connection = mysql.createConnection(config.database);

connection.connect(function (err) {
    if (err) {
        console.log("Error connecting database ..", err);
    }
});

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'html');
nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.locals.cityName = config.APILocationInfo.cityName;
app.get('/', function (req, res) {

    connection.query("SELECT * FROM posts ORDER BY id DESC", function (err, rows, fields) {
        if (!err) {

            res.render('index', { posts: rows });
        } else {
            console.log('Error while performing Query.', err);
        }

    });

});
app.get('*', function (req, res) {
    res.send('<h1>404, Page Not found</h1>');
});

app.listen(3000, function () {
    console.log('Twitter weather update BOT listening on port 3000!\n visit: http://localhost:3000');
})
