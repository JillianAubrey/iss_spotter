const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
  }
  console.log('IP Adress:' , ip);
  fetchCoordsByIP(ip);
});