# Twitter-weather-update-bot
A Twitter bot which waits for #hashTag and sends weather update of city via tweets to the user

#How it Works

### Step 1:
User tweets to get weather update using hashTag **#DhakaWeather**  such as:

img1


### Step 2:
The twiter weather BOT always filters hashTag **#DhakaWeather**. And when ueser tweets this hastag ths BOT automatically responds him back with Weather information. For Example:

#Tweets Monitoring
You can see all the tweets and response to tweets with their details in Tweets Monitoring panel. (Page Refreshing needed, Ajax not Implemented)

Image 3

#Installation

### Create a Twitter Application
Go to https://apps.twitter.com/ and create a new Application. Then you will get consumer key, secret and access_token


### Get Weather API Key:
Go to http://openweathermap.org/appid. If you don't have account yet you need to sign up to get free API Key. Their's APIs are really awesome. Don't hasitate.

### Create MySQL Database:
Create a mysql database named as **twitter_bot**. or anything else. Thene import the database schema from **database.sql** file from your project root directory.

####Change Configuration:
After completing above steps please change the configuration file with your own App specific Information
In src\utils\config.js :

```js
module.exports.tweeterConfig = {
    consumer_key: 'YOUR_consumer_key',
    consumer_secret: 'YOUR_consumer_secret',
    access_token_key: 'YOUR_access_token_key',
    access_token_secret: 'YOUR_access_token_secret'
};


module.exports.database = {
    host: 'localhost',
    user: 'root', // replace the user name with your own
    password: 'YOUR_DB_PASSWORD', // replace the password with your own
    database: 'twitter_bot'
};

module.exports.APILocationInfo = {
    weatherAPIKEY: '240fae0e48fd82c8f35f6657c96496e4',
    hashTag: '#DhakaWeather', // you may replace it with your own
    cityID: '1337179', //This id denotes Dhaka, Bangladesh. To replace with your one get it from openweather.org
    cityNamye: 'Dhaka' // This City Name will be used when response back to the tweets. You may change it
};
```
###Final Stage:
I think you have successfully configured these information. If everything goes well run following line in your Terminal or Command Line Tools from project directory:

```sh
$ npm start
```
Then Go to [http://localhost:3000](http://localhost:3000) and visit. At first you will get a blank table. But when someone tweets using your hash tag the system will response him back and save to your database.
You have refresh you page to see tweets.

#Note
Twitter Application has some strict rules. As a result your app may be down for a short period while developing if you restart your server freequently or Execute your twitter connection related codes.
If you found any error related to status then read the twitter API Error and Response Status code page. 
https://dev.twitter.com/overview/api/response-codes

**Developed with ♥ using Nodejs,Express, MySQL, Jquery, Nunjuck**

