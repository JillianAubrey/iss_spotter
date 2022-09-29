const request = require('request');
let timezone;

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
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      callback(Error(parsedBody.message), null);
      return;
    }
    const { latitude, longitude } = parsedBody;
    timezone = parsedBody.timezone;
    console.log(`The next ISS passes for ${parsedBody.city}:`);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const flyOvers = JSON.parse(body).response;
    callback(null, flyOvers);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("There was an error while fetching the IP address!\n" , error);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("There was an error while fetching the coordinates!\n" , error);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, results) => {
        if (error) {
          console.log("There was an error while fetching the ISS flyover times!\n" , error);
          return;
        }
        callback(null, results, timezone);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };