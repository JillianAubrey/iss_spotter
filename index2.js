const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  passTimes.forEach(pass => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });
};

nextISSTimesForMyLocation().
  then(printPassTimes);

