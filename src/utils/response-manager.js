var fetch = require('node-fetch');
const APIInfo = require('./config').APILocationInfo;

module.exports.getCurrentWeatherInfo = function () {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${APIInfo.cityID}&appid=${APIInfo.weatherAPIKEY}&units=Metric`);
};
