import Head from 'next/head'
import Base from '../components/base'
import Box from '../components/box'
import { render } from 'react-dom'
import moment from 'moment-timezone'
import celciusToFehrenheit from '../shared_functions'

// Gets Mars Weather Data From NASA
export async function getStaticProps() {
  // https://stackoverflow.com/questions/4870328/read-environment-variables-in-node-js
  let apiKey = process.env.NASA_API_KEY;

  // Get Weather Data
  let weatherQuery = await fetch("https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0");
  weatherQuery = await weatherQuery.json();
  let sol = weatherQuery.sol_keys[weatherQuery.sol_keys.length-1];
  let latestWeatherObj = weatherQuery[weatherQuery.sol_keys[weatherQuery.sol_keys.length-1]]; /**/

  // Get picture URLs
  let curiosityRoverPhotoQuery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`);
  let opportunityRoverPhotoQuery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=${sol}&api_key=${apiKey}`);
  let spiritRoverPhotoQuery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=${sol}&api_key=${apiKey}`);
  curiosityRoverPhotoQuery = await curiosityRoverPhotoQuery.json();
  opportunityRoverPhotoQuery = await opportunityRoverPhotoQuery.json();
  spiritRoverPhotoQuery = await spiritRoverPhotoQuery.json();

  // Get Astronomy Picture of the day. We will use it as a background image
  let APOTDQuery = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  APOTDQuery = await APOTDQuery.json();

  return {
    props: {
      date: latestWeatherObj.Last_UTC ? moment(latestWeatherObj.Last_UTC).tz('America/Los_Angeles').format('ll') : "Unknown Date", // Might want to get current timezone
      "sol": sol,
      high: latestWeatherObj.AT ? celciusToFehrenheit(latestWeatherObj.AT.mx) : "Unknown",
      low: latestWeatherObj.AT ? celciusToFehrenheit(latestWeatherObj.AT.mn) : "Unknown",
      winddirection: latestWeatherObj.WD.most_common ? latestWeatherObj.WD.most_common.compass_point : "Unknown",
      windspeed: latestWeatherObj.HWS ? latestWeatherObj.HWS.av : "Unknown",
      pressure: latestWeatherObj.PRE ? latestWeatherObj.PRE.av : "Unknown",
      season: latestWeatherObj.Season ? String(latestWeatherObj.Season) : "Unknown",
      curiositypic1: curiosityRoverPhotoQuery.photos.length > 0 ? curiosityRoverPhotoQuery.photos[0].img_src.replace('http://', 'https://') : "", // https://stackoverflow.com/questions/17277746/how-to-replace-http-with-https-via-javascript
      opportunitypic1: opportunityRoverPhotoQuery.photos.length > 0 ? opportunityRoverPhotoQuery.photos[0].img_src.replace('http://', 'https://') : "",
      spiritpic1: spiritRoverPhotoQuery.photos.length > 0 ? spiritRoverPhotoQuery.photos[0].img_src.replace('http://', 'https://') : "",
      curiositypic2: curiosityRoverPhotoQuery.photos.length > 2 ? curiosityRoverPhotoQuery.photos[2].img_src.replace('http://', 'https://') : "", // I skip to the third image because the first and second look almost the same
      opportunitypic2: opportunityRoverPhotoQuery.photos.length > 2 ? opportunityRoverPhotoQuery.photos[2].img_src.replace('http://', 'https://') : "", 
      spiritpic2: spiritRoverPhotoQuery.photos.length > 2 ? spiritRoverPhotoQuery.photos[2].img_src.replace('http://', 'https://') : "", 
      apic_pic: APOTDQuery.hdurl ? APOTDQuery.hdurl.replace('http://', 'https://') : (APOTDQuery.url ? APOTDQuery.url.replace('http://', 'https://') : ""), 
      apic_copyright: APOTDQuery.hasOwnProperty("copyright") && (APOTDQuery.hdurl || APOTDQuery.url) ? APOTDQuery.copyright : "", 
    }
  };
}

export default class Index extends React.Component {
  getSeasonIcon(season) {
    if (season === "summer") {
      return "iconfinder_sun_4677537.svg";
    }
    else if (season === "fall" || season === "autumn") { // Not sure if it's "fall" or "autumn"... hopefully its one of them at least!
      return "iconfinder_01_autumn-fall-leaves_2660284.svg";
    }
    else if (season === "winter") {
      return "iconfinder_72_snowflake_christmas_holiday_winter_season_4008369.svg";
    }
    else if (season === "spring") {
      return "iconfinder_warm_1076727.svg";
    }
    else {
      return "iconfinder_164_QuestionMark_183285.svg";
    }
  }

  getWindDirectionTransform(windDirection) { // Could just try to get the degree and rotate it that way
    // https://en.wikipedia.org/wiki/Points_of_the_compass
    switch (windDirection) {
      case ("N"):
        return 0;
      case ("NNE"):
        return 22.5;
      case ("NE"):
        return 45;
      case ("ENE"):
        return 67.5;
      case ("E"):
        return 90;
      case ("ESE"):
        return 112.5;
      case ("SE"):
        return 135;
      case ("SSE"):
        return 157.5;
      case ("S"):
        return 180;
      case ("SSW"):
        return 202.5;
      case ("SW"):
        return 225;
      case ("WSW"):
        return 247.5;
      case ("W"):
        return 270;
      case ("WNW"):
        return 292.5;
      case ("NW"):
        return 315;
      case ("NNW"):
        return 337.5;
      default:
        return null;
    }
  }

  // Loads the UI
  render() {
    // Shared Variables
    let minBoxHeight = 400;
    let minBoxWidth = 300;

    // Remember accessibility overhall
    return (
      <>
        <Head>
          <title>Current Weather - Mars Weather App</title>
          <link rel="icon" href="iconfinder_planet_univearse_telestial_space_mars_1039574.ico" />
        </Head>
        <Base pictureURL={this.props.apic_pic} copyright={this.props.apic_copyright}>
          <div className="title">
            <Box abswidth="300" absheight="200">
              <h1>{this.props.date}</h1>
              <p>Sol {this.props.sol}</p> 
            </Box>
          </div>
          <div className="flex-row">
            <Box minwidth={minBoxWidth} minheight={minBoxHeight}>
              <h2>Temperature</h2>
              <img className="weather-icon" alt="Temperature Icon" src="iconfinder_82_Thermometer_Half_Full_183395.svg" />
              <p className="data-val">High: {this.props.high}° F</p>
              <p className="data-val">Low: {this.props.low}° F</p>
              {/*<p>Temperature Switch - Dropdown</p>*/}
            </Box>
            <Box minwidth={minBoxWidth} minheight={minBoxHeight}>
              <h2>Wind</h2>
              <span className="data-val">{this.getWindDirectionTransform(this.props.winddirection) == null ? "Unkown" : ""}</span>
              <img className="weather-icon wind-icon" alt="Wind Icon" src={this.getWindDirectionTransform(this.props.winddirection) != null ? "iconfinder_037_ArrowUp_183517.svg" : ""}/>
              <p className="unit">(Most Common Direction)</p>
              <p className="data-val">{this.props.windspeed} m/s</p>
              <p className="unit">(Avg. Hor. Wind Speed)</p>
            </Box>
            <Box minwidth={minBoxWidth} minheight={minBoxHeight}>
              <h2>Pressure</h2>
              <img className="weather-icon" alt="Pressure Icon" src="iconfinder_100_Pressure_Reading_183532.svg" />
              <p className="data-val">{this.props.pressure}</p>
              <p className="unit">(Pascals)</p>
            </Box>
            <Box minwidth={minBoxWidth} minheight={minBoxHeight}>
              <h2>Season</h2>
              <img class="weather-icon" alt="Season Icon" src={this.getSeasonIcon(this.props.season)} />
              <p className="data-val">{this.props.season.charAt(0).toUpperCase() + this.props.season.slice(1)}</p> {/*https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript*/}
            </Box>
          </div>
          <div className="flex-row">
            <img className="rover-photo" alt="Picture From NASA's Curiosity Rover" src={this.props.curiositypic1}/>
            <img className="rover-photo" alt="Picture From NASA's Opportunity Rover" src={this.props.opportunitypic1}/>
            <img className="rover-photo" alt="Picture From NASA's Spirit Rover" src={this.props.spiritpic1}/>
            <img className="rover-photo" alt="Picture From NASA's Curiosity Rover" src={this.props.curiositypic2}/>
            <img className="rover-photo" alt="Picture From NASA's Opportunity Rover" src={this.props.opportunitypic2}/>
            <img className="rover-photo" alt="Picture From NASA's Spirit Rover" src={this.props.spiritpic2}/>
          </div>
        </Base>

        <style jsx global>{`
          .flex-col {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-around;
          }
          .flex-row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
          }
          .rover-photo {
            margin-top: 30px;
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 30px;
            width: 450px;
            max-width: 100%;
          }
          .weather-icon {
            width: 150px;
          }
          .wind-icon {
            transform: rotate(${this.getWindDirectionTransform(this.props.winddirection) + "deg"});
          }
          h1 {
            margin-bottom: 5px;
          }
          h2 {
            text-decoration: underline;
            font-size: xx-large;
          }
          .data-val {
            font-size: xx-large;
            margin-bottom: 0px;
          }
          .unit {
            margin-top: 0px;
            font-size: large;
          }
          .title div {
            padding: 1px;
            margin-bottom: 20px;
            margin-top: 10px;
          }
          .title p {
            font-size: x-large;
            margin-top: 0px;
          }
        `}</style>
      </>
    );
  }
}
