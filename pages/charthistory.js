import Head from 'next/head'
import Base from '../components/base'

// Database Query Functions

// A function component, since I don't know if I need anything else
export default function ChartHistory() {
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
              <input type="date"/>
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
    
          </div>
          <style jsx>{`
            /*
            <Chart type="temp"></Chart>
            <Chart type="wind-speed"></Chart>
            <Chart type="wind-direction"></Chart>
            <Chart type="pressure"></Chart>
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
            form input[type="submit"] {
              width: 50%;
            }
          `}
          </style>
        </Base>

        </>
    )
}