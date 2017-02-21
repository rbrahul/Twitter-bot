// Please replace these configuration with your owns 

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
    cityName: 'Dhaka'
};

