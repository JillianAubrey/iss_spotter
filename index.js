const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes, timezone) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes, timezone);
});

const printPassTimes = function(passTimes, timezone) {
  passTimes.forEach((pass)=>  {
    const dateObject = new Date(0);
    dateObject.setUTCSeconds(pass.risetime);
    const dateStr = `${dateObject.toLocaleString("en-US", {timeZone: timezone.id})} ${timezone.abbr}`;
    const duration = pass.duration;
    console.log(`Next pass at ${dateStr} for ${duration} seconds!`);
  });
};