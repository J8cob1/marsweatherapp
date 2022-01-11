import Head from 'next/head';
import Base from '../components/base';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import moment from 'moment-timezone';

// Gets Mars Weather Data From NASA
export async function getStaticProps() {
  // https://stackoverflow.com/questions/4870328/read-environment-variables-in-node-js
  let apiKey = process.env.NASA_API_KEY;

  // Get weather data and return it
  let weatherQuery = await fetch("https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0");
  let response = await weatherQuery.json();
  return {
    props: {
      weatherObject: response
    }
  };
}

// A function component, since I don't know if I need anything else
export default function ChartHistory(props) {
    // Some sources I used in this file
    // https://github.com/jerairrest/react-chartjs-2/issues/388 told me how to get dataset colors
    // https://www.chartjs.org/docs/latest/charts/bar.html#data-structure
    // https://github.com/jerairrest/react-chartjs-2
    // https://pusher.com/tutorials/realtime-data-visualization-nextjs

    // Might consider adding a table with data below the charts

    // Define Datasets
    // https://stackoverflow.com/questions/38272444/chart-js-axes-label-font-size
    let chart_options = {
      title: {
        text: "High Temperature",
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 20
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 20
          }
        }]
      },
      legend: {
        labels: {
          fontSize: 25,
          boxWidth: 0
        }
      }
    }
    let temperature_high_data = {
        labels: [],
        datasets: [{
          label: "High Temperature (° F)",
          backgroundColor: "red",
          barThickness: 50,
          minBarLength: 100,
          data: []
        }]
    }
    let temperature_low_data = {
      labels: [],
      datasets: [{
          label: "Low Temperature (° F)",
          backgroundColor: "blue",
          barThickness: 50,
          minBarLength: 100,
          data: []
      }]
    }
    let wind_direction_data = {
        labels: [],
        datasets: [{
            label: "Most Common Wind Direction (°)",
            backgroundColor: "orange",
            barThickness: 50,
            minBarLength: 100,
            data: []
        }]
    }
    let wind_speed_data = {
      labels: [],
      datasets: [{
          label: "Average Horizontal Wind Speed (m/s)",
          backgroundColor: "gold",
          barThickness: 50,
          minBarLength: 100,
          data: []
      }]
    }
    let pressure_data = {
        labels: [],
        datasets: [{
            label: "Pressure (pascals)",
            backgroundColor: "green",
            barThickness: 50,
            minBarLength: 100,
            data: []
        }]
    }

    // Get Weather Data
    let weatherObject = props.weatherObject;
    // Get data for start and end date, and parse it
    //let results = {start_date, end_date} // Make SQL Call

    // Process weather data and put them in the graphs
    weatherObject.sol_keys.sort() // Sort just in case. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    for (let solkey of weatherObject.sol_keys) {
      // Get wether object
      let weatherOnSingleDay = weatherObject[solkey]

      // Append Labels
      let date = moment(weatherOnSingleDay.Last_UTC).tz('America/Los_Angeles').format('ll');
      temperature_high_data.labels.push(date);
      temperature_low_data.labels.push(date);
      wind_direction_data.labels.push(date);
      wind_speed_data.labels.push(date);
      pressure_data.labels.push(date);

      // Set data
      temperature_high_data.datasets[0].data.push(weatherOnSingleDay.AT ? weatherOnSingleDay.AT.mx : null);
      temperature_low_data.datasets[0].data.push(weatherOnSingleDay.AT ? weatherOnSingleDay.AT.mn : null);
      wind_direction_data.datasets[0].data.push(weatherOnSingleDay.WD.most_common != null ? weatherOnSingleDay.WD.most_common.compass_degrees : null);
      wind_speed_data.datasets[0].data.push(weatherOnSingleDay.HWS ? weatherOnSingleDay.HWS.av : null);
      pressure_data.datasets[0].data.push(weatherOnSingleDay.PRE ? weatherOnSingleDay.PRE.av : null);
    }
    /*    <h1>Weather History</h1>q
          <p>
            This tool allows you to chart and exmaine Mars weather data. More specifically, it graphs temperature,
            wind speed and direction, and pressure data for all days starting from the start date up through the 
            end date. We are limited by the amount of data we have however, as the NASA API I use isn't one that 
            allows you to query historical numbers
          </p>
          <form>
            <label>
              Start Date
              <input id="startdate" type="date"/>
            </label>
            <label>
              End Date
              <input id="enddate" type="date"/>
            </label>
            <input type="submit" value="Draw Charts"/>
          </form> */
    return (
        <>
        <Head>
          <title>Weather History - Mars Weather App</title>
          <link rel="icon" href="iconfinder_planet_univearse_telestial_space_mars_1039574.ico" />
        </Head>
        <Base>
          <div className="color-light">
            <h1>Weather History</h1>
            <p>
              This page allows you to chart and exmaine the Mars weather data for the last seven days. More specifically, it graphs temperature,
              wind speed and direction, and pressure data for the last seven days.
            </p>
            <div className="charts">
              <div>
                <Bar data={temperature_high_data} options={chart_options} />
              </div>
              <div>
                <Bar data={temperature_low_data} options={chart_options} />
              </div>
              <div>
                <Bar data={wind_direction_data} options={chart_options} />
              </div>
              <div>
                <Bar data={wind_speed_data} options={chart_options} />
              </div>
              <div>
                <Bar data={pressure_data} options={chart_options} />
              </div>
            </div>
          </div>

          <style jsx>{`
            * {
              color: black;
            }
            h1 {
              text-align: center;
            }
            form {
              max-width: 700px;
              text-align: center;
              margin: auto;
            }
            form input[type="submit"] {
              margin: auto;
              margin-top: 10px;
              width: 101%;
              height: 50px;
              background-color: darkorange;
              border-color: darkorange;
              color: white;
              font-size: 1.2em;
            }
            form input[type="date"] {
              width: 100%;
            }
            label {
              display: block;
              margin-top: 10px;
              font-weight: bold;
            }
            p {
              text-align: center;
              padding: 10px;
              font-size: 1.3em;
            }
            .charts div {
              padding: 10px;
              max-width: 1440px;
              margin: 30px auto;
            }
          `}
          </style>
        </Base>
        </>
    )
}