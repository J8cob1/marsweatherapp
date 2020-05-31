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

    // Fill datasets
    /*function getData(start_date, end_date) {*/
        // date
        // temp
        // avg. wind speed
        // pressure

    // Charts.js variables

    // Get data for start and end date, and parse it
    /*let results = {start_date, end_date} // Make SQL Call
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
          <title>Current Weather - Mars Weather App</title>
          <link rel="icon" href="iconfinder_mars_37873.png" />
        </Head>
        <Base>
          <h1>Weather History</h1>
          <div className="top">
            <form>
              <label>Start Date</label>
              <input type="date"/>
              <label>End Date</label>
              <input type="dsate"/>
              <input type="submit" value="Draw Charts"/>
            </form>
            <hr/>
            <p>
              This tool allows you to chart and exmaine Mars weather data. More specifically, it graphs temperature,
              wind speed and direction, and pressure data for all days starting from the start date up through the 
              end date. We are limited by the amount of data we have however, as the NASA API I use isn't one that 
              allows you to query historical numbers
             </p>
          </div>
          <div className="charts">
            <div>
                <Bar options={{ maintainAspectRatio: false }} data={temperature_data} height={200} width={300}/>
            </div>
            <div>
                <Bar options={{ maintainAspectRatio: false }} data={wind_data} height={200} width={300}/>
            </div>
            <div>
                <Bar options={{ maintainAspectRatio: false }} data={pressure_data} height={200} width={300}/>
            </div>
          </div>
          <style jsx>{`
            /*
            */
            h1 {
              border-bottom: 1px solid black; 
              text-align: center;
              margin: auto;
            }
            .top {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-around;
            }
            .charts {
                margin: 10px;
            }
            form {
                width: 45%;
            }
            form input[type="submit"] {
              width: 100%;
            }
          `}
          </style>
        </Base>
        </>
    )
}