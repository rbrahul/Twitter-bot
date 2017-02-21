const TwitterPackage = require("twitter");
const fetch = require("node-fetch");
const responseManager = require("./utils/response-manager");

const config = require('./utils/config');
var Twitter = new TwitterPackage(config.tweeterConfig);
var mysql = require('mysql');
var connection = mysql.createConnection(config.database);

connection.connect(function (err) {
    if (err) {
        console.log("Error connecting database ..", err);
    }
});

function escapeSingleQoute(text) {
    return text.replace(/\'/g, "\\'")
}

function sendPostBack(sender, sender_message, reply_message, others) {
    Twitter.post('statuses/update', { status: reply_message }, function (error, tweet, response) {
        if (error) {
            console.log(error);
        } else {
            const timeStr = new Date().toString();
            connection.query("INSERT INTO posts(`sender`,`sender_message`,`reply_message`,`posted_at`,`others`) VALUES('" + sender + "','" + sender_message + "','" + reply_message + "','" + timeStr + "','" + others + "')", function (err, rows, fields) {
                if (!err) {
                    console.log('Post have been stored: ', rows);
                } else {
                    console.log('Error while performing Query.', err);
                }

            });
        }

    });
}


Twitter.stream('statuses/filter', { track: config.APILocationInfo.hashTag },
    function (stream) {
        stream.on('data', function (tweet) {
            responseManager.getCurrentWeatherInfo()
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    const mentionString = '@' + tweet.user.screen_name;
                    const weatherInfo = `Weather of ${config.APILocationInfo.cityName}: ${response.weather[0].description}, Temperature:${response.main.temp} Celcious, Humidity: ${response.main.humidity}`
                    const reply_message = `Hi ${mentionString}! ${weatherInfo}`;
                    const sender_message = tweet.text;
                    sendPostBack(escapeSingleQoute(mentionString), escapeSingleQoute(sender_message), escapeSingleQoute(reply_message), escapeSingleQoute(JSON.stringify(tweet, null, 4)));
                });

            console.log(tweet.text);
        });
        stream.on('error', function (error) {
            console.log('error found', error);
        });
    });
