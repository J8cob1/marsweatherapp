// Database configuration and setup
// https://www.npmjs.com/package/dynamodb
var dynamodb = require('dynamodb');
dynamo.AWS.config.update({accessKeyId: process.env.DATABASE_ACCESS_KEY, secretAccessKey: process.env.DATABASE_SECRET, region: "us-west-2"});
var WeatherEntry = dynamo.define('marsweatherapp', {
    hashKey : 'sol',
    // add the timestamp attributes (updatedAt, createdAt)
    timestamps : true,
    schema : {
      sol              : dynamo.types.String(),
      date             : dynamo.types.String(),
      high             : dynamo.types.String(),
      low              : dynamo.types.String(),
      wind_direction   : dynamo.types.String(),
      wind_speed       : dynamo.types.String(),
      pressure         : dynamo.types.String(),
      season           : dynamo.types.String(),
      settings : {}
    }
});

// Get an item from the database and return it
async function getEntryFromDB(sol) {
  return WeatherEntry.get(sol);
}

// Put data in the database
async function putEntryInDB(weatherdataentry) {
    var newEntry = new WeatherEntry({
      "sol": weatherdataentry.sol,
      "date": weatherdataentry.date,
      "high": weatherdataentry.high,
      "low": weatherdataentry.low,
      "mcwd": weatherdataentry.mcwd,
      "ahws": weatherdataentry.ahws,
      "pressure": weatherdataentry.pressure,
      "season": weatherdataentry.season
    });
    return newEntry.save();
}

// Put Sol Data for a specific sol in the database
//function putSolData(soldata) {
  // Put database for data for all sols using data from a previously made request
//}

export default {
  "getEntryFromDB": getEntryFromDB,
  "putEntryInDB": putEntryInDB
}