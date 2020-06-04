import Head from 'next/head'
import Base from '../components/base'
import Box from '../components/box'
import moment from 'moment-timezone'
import celciusToFehrenheit from '../shared_functions'
import HistoryBox from '../components/historyBox'

// Gets Mars Weather Data From NASA
export async function getStaticProps() {
  // https://stackoverflow.com/questions/4870328/read-environment-variables-in-node-js
  let apiKey = process.env.NASA_API_KEY;
  
  // Get Weather Data
  let weatherQuery = await fetch("https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0");
  weatherQuery = await weatherQuery.json();

  // Build other boxes
  // https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
  let data = []
  weatherQuery.sol_keys.forEach(sol => {
    data.push({
      date: moment(weatherQuery[sol].Last_UTC).tz('America/Los_Angeles').format('ll'),
      "sol": sol,
      high: celciusToFehrenheit(weatherQuery[sol].AT.mx),
      low: celciusToFehrenheit(weatherQuery[sol].AT.mn),
      wind_direction: weatherQuery[sol].WD.most_common.compass_point,
      wind_speed: weatherQuery[sol].HWS.av,
      pressure: weatherQuery[sol].PRE.av,
      season: weatherQuery[sol].Season,
    });
  });

  return {
    props: {
      boxes: data
    }
  };
}

export default function SevenDayHistory(props) {
  return (
    <>
    <Head>
      <title>Seven Day History - Mars Weather App</title>
      <link rel="icon" href="iconfinder_planet_univearse_telestial_space_mars_1039574.ico" />
    </Head>
    <Base>
      <div className="title">
        <Box abswidth="300" absheight="200">
          <h1>7 Day History</h1>
        </Box>
      </div>
      <div className="flex-row">
        {/*<HistoryBox
          date="Key"
          sol=""
          high="High: Highest Temperature Of The Day"
          low="Low: Lowest Temperature Of The Day"
          wind_direction="MCWD: Most Common Wind Direction"
          wind_speed="AHWS: Average Horizontal Wind Speed"
          pressure="Press: Avg. ? Pressure"
          season="Season: Summer/Fall/Winter/Spring"
        />*/}
        {// https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
          props.boxes.map((box, i) => {
            return <HistoryBox
              date={box.date}
              sol={box.sol}
              high={box.high}
              low={box.low}
              wind_direction={box.wind_direction}
              wind_speed={box.wind_speed}
              pressure={box.pressure}
              season={box.season}
              key={i}
            />})}
      </div>

      <style jsx global>{`
        h2 {
          text-decoration: underline;
          font-size: xx-large;
        }
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
          justify-content: spasce-around;
        }
        .flex-row div {
          margin-bottom: 40px; 
        }
        .title div {
          margin-bottom: 30px;
          margin-top: 10px;
        }
        .title h1 {
          padding: 10px;
        }
      `}</style>
      </Base>
    </>
  );
}
