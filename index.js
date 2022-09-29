const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("There was an error while fetching the IP address!\n" , error);
    return;
  }
  console.log('IP Adress:' , ip);
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("There was an error while fetching the coordinates!\n" , error);
      return;
    }
    console.log(`Coordinates: ${coordinates.latitude}, ${coordinates.longitude}`);
  });
});