const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("There was an error while fetching the IP address!\n" , error);
    return;
  }
  console.log('IP Adress:' , ip);
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("There was an error while fetching the coordinates!\n" , error);
      return;
    }
    console.log(`Coordinates: ${coords.latitude}, ${coords.longitude}`);
    fetchISSFlyOverTimes(coords, (error, results) => {
      if (error) {
        console.log("There was an error while fetching the ISS flyover times!\n" , error);
        return;
      }
    });
  });
});