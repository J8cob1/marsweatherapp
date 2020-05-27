import Head from 'next/head'
import Base from '../components/base'
import Box from '../components/box'
import { render } from 'react-dom'
import moment from 'moment-timezone'
import celciusToFehrenheit from '../shared_functions'

// Gets Mars Weather Data From NASA
export async function getStaticProps() {
  // https://stackoverflow.com/questions/4870328/read-environment-variables-in-node-js
  let apiKey = process.env.NASA_API_KEY

  // Get Weather Data
  let weatherQuery = await fetch("https://api.nasa.gov/insight_weather/?api_key=" + apiKey + "&feedtype=json&ver=1.0");
  weatherQuery = await weatherQuery.json();
  let sol = weatherQuery.sol_keys[weatherQuery.sol_keys.length-1]
  let latestWeatherObj = weatherQuery[weatherQuery.sol_keys[weatherQuery.sol_keys.length-1]]; /**/
  
  // Get picture URLs
  let curiosityRoverPhotoQuery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}&camera=NAVCAM`);
  let opportunityRoverPhotoQuery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=${sol}&api_key=${apiKey}&camera=NAVCAM`);
  let spiritRoverPhotoQuery = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=${sol}&api_key=${apiKey}&camera=NAVCAM`);
  curiosityRoverPhotoQuery = await curiosityRoverPhotoQuery.json();
  opportunityRoverPhotoQuery = await opportunityRoverPhotoQuery.json();
  spiritRoverPhotoQuery = await spiritRoverPhotoQuery.json();

  // Get Astronomy Picture of the day
  //let APOTDQuery = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  //APOTDQuery = await APOTDQuery.json();

  /*.space-background {
  background-img: url(${apic_pic});
  }*/

  return {
    props: {
      date: moment(latestWeatherObj.Last_UTC).tz('America/Los_Angeles').format('ll'), // Might want to get current timezone
      "sol": sol,
      high: celciusToFehrenheit(latestWeatherObj.AT.mx),
      low: celciusToFehrenheit(latestWeatherObj.AT.mn),
      wind: latestWeatherObj.WD.most_common.compass_point,
      pressure: latestWeatherObj.PRE.av,
      season: latestWeatherObj.Season,
      curiositypic: curiosityRoverPhotoQuery.photos.length > 0 ? curiosityRoverPhotoQuery.photos[0].img_src : "",
      opportunitypic: opportunityRoverPhotoQuery.photos.length > 0 ? opportunityRoverPhotoQuery.photos[0].img_src : "",
      spiritpic: spiritRoverPhotoQuery.photos.length > 0 ? spiritRoverPhotoQuery.photos[0].img_src : "",
      //apic_pic: APOTDQuery.hdurl,
      //apic_copyright: APOTDQuery.hasOwnProperty("copyright") ? APOTDQuery.copyright : "",
    }
  };
}

export default class Index extends React.Component {
  // Loads the UI
  render() {
    // Reminder: change favicon give propper credit for favicon
    // Remember accessibility overhall
    return (
      <>
        <Head>
          <title>Current Weather - Mars Weather App</title>
          <link rel="icon" href="iconfinder_mars_37873.png" />
        </Head>
        <Base>
          <div className="flex-row">
            <div className="title">
                <h1>{this.props.date}</h1>
                <p>Sol {this.props.sol}</p> 
            </div>
          </div>
          <div className="flex-row">
            <Box>
              <h2>Temperature</h2>
              <p>High: {this.props.high}</p>
              <p>Low: {this.props.low}</p>
              <p>Temperature Switch - Dropdown</p>
            </Box>
            <Box>
              <h2>Wind</h2>
              <p>Most Common Wind Direction: {this.props.wind}</p>
              <p>Average Horizontal Wind Speed: {this.props.wind}</p>
            </Box>
            <Box>
              <h2>Pressure</h2>
              <p>{this.props.pressure}</p>
              <p>(pascals)</p>
            </Box>
            <Box>
              <h2>Season</h2>
              {this.props.season}
            </Box>
          </div>
          <div className="flex-row">
            <img src={this.props.curiositypic}></img>
            <img src={this.props.opportunitypic}></img>
            <img src={this.props.spiritpic}></img>
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
          img {
            margin-top: 70px;
            margin-left: 10px;
            margin-right: 10px;
            width: 400px;
          }
          .title {
            text-align: center;
          }
          .title h1 {
            margin-bottom: 5px;
          }
          .title p {
            font-size: x-large;
            margin-top: 0px;
          }
        `}</style>
      </>
    );
  }
  /*return (
    <div className="container">
      <Head
        <title>Current Weather - Mars Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/zeit/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;s site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )*/
}
