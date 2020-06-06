import Head from 'next/head'
import Base from '../components/base'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Mars Weather App</title>
        <link rel="icon" href="iconfinder_planet_univearse_telestial_space_mars_1039574.ico" />
      </Head>
      <Base>
        <div className="color-light">
          <h1>About</h1>
          <p className="header-text">
            This web app tells you the weather of Mars at Elysium Plinita using data from NASA's API's.               
            It displays the latest weather report, with some pictures, and the weather reports for the last seven days. 
            There is also a page that graphs specific weather metrics of the last seven days for you. I hope you enjoy!
          </p>
          <section>
            <h2>Technology Stack</h2>
            <p>
              This app started off as an npm next.js template, and makes use of the following technologies:
              <ul>
                <li>Next.js (Node.js + React)</li>
                <li>Varcel</li>
                <li>Moment and Moment-Timezone</li>
                <li>Charts.js</li>
                <li>NASA's Insight API</li>
                <li>NASA's Mars Rover Photos API</li>
                <li>NASA's Astronomy Picture of the Day API</li>
              </ul>
              Next.js forms the backend of the application, Varcel is used for deployment, moment/moment-timezone are used for date
              conversion, and NASA's APIs are used for data.
            </p> 
          </section>
          <section>
            <h2>Repository</h2>
            <p>
              The code for this app is available at <a href="https://github.com/J8cob1/marsweatherapp">https://github.com/J8cob1/marsweatherapp</a>.
            </p>          
          </section>
        </div>
      </Base>

      <style jsx>{`
          a {
            color: black;
          }
          div {
            padding: 10px;
            height: 100%;
          }
          p {
            font-size: 1.4em;
          }
          h1 {
            text-align: center;
          }
          .header-text {
            text-align: center;
            margin-bottom: 50px;
          }
      `}</style>
    </>
  );
}