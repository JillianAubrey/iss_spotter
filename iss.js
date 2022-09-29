const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request('http://ipwho.is/' + ip, (error, response, body) =>{
    console.log('error', error);
    console.log('status code', response.statusCode);
    const ipInfo = JSON.parse(body);
    const lat = ipInfo.latitude;
    const lng = ipInfo.longitude;
    console.log(`latitude: ${lat}, longitude ${lng}`);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };