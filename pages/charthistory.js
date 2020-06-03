import Head from 'next/head'
import Base from '../components/base'
import { Bar } from 'react-chartjs-2';

// Database Query Functions

// A function component, since I don't know if I need anything else
export default function ChartHistory() {
    // https://github.com/jerairrest/react-chartjs-2/issues/388 told me how to get dataset colors
    // https://www.chartjs.org/docs/latest/charts/bar.html#data-structure
    // https://github.com/jerairrest/react-chartjs-2
    // https://pusher.com/tutorials/realtime-data-visualization-nextjs
    
    // Might consider adding a table with data below the charts

    // Dataset Variables
    let properties = {}
    let temperature_data = {
        labels: ["temp 1", "temp 2", "temp 3", "temp 4", "temp 5"],
        datasets: [{
            label: "Temperature (degrees fahrenheit)",
            backgroundColor: "red",
            barThickness: 50,
            minBarLength: 100,
            data: [10, 20, 30, 40, 50]
        }]
    }
    let wind_data = {
        labels: ["temp 1", "temp 2", "temp 3", "temp 4", "temp 5"],
        datasets: [{
            label: "Avg. Wind Speed (m/s)",
            backgroundColor: "orange",
            barThickness: 50,
            minBarLength: 100,
            data: [10, 20, 30, 40, 50]
        }]
    }
    let pressure_data = {
        labels: ["temp 1", "temp 2", "temp 3", "temp 4", "temp 5"],
        datasets: [{
            label: "Pressure (pascals)",
            backgroundColor: "gold",
            barThickness: 50,
            minBarLength: 100,
            data: [10, 20, 30, 40, 50]
        }]
    }

    // Get data for start and end date, and parse it
    /*let results = {start_date, end_date} // Make SQL Call
        // Fill datasets
        // date
        // temp
        // avg. wind speed
        // pressure
    for (day in results) {
        // Append date for bar graph labels
        labels.push(day.date);
        
        // Append dataset information
        temp_dataset.data.push();
        wind_dataset.data.push();
        pressure_dataset.push();
    }*/

    return (
        <>
        <Head>
          <title>Weather History - Mars Weather App</title>
          <link rel="icon" href="iconfinder_planet_univearse_telestial_space_mars_1039574.ico" />
        </Head>
        <Base>
          <h1>Weather History</h1>
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
          </form>
          <div className="charts">
            <div>
              <Bar data={temperature_data} />
            </div>
            <div>
              <Bar data={wind_data} />
            </div>
            <div>
              <Bar data={pressure_data} />
            </div>
          </div>
          <style jsx>{`
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
              margin-top: 40px;
            }
          `}
          </style>
        </Base>
        </>
    )
}