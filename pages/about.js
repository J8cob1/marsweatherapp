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
        <h1>About</h1>
        <p>
            This web app was created as a part of a full stack web development class at Portland State University. 
            It displayes the weather of Mars at a place named "Elysium Plinita" using data from NASA. 
            It displays the latest weather report, with some pictures, as well as the weather reports for the last seven days, and gives 
            you the ability to graph and compare all of the weather data we have stored the app's local database. I hope you enjoy!
        </p>
        <section>
            <h2>Technology Stack</h2>
            <p>
              This app is based on the "npm create-next-app" (or something like that) template and relies on Next.js (Node + React), SQLite, and is deployed 
              via Varcel. It uses the moment, moment-timezone and charts.js libraries and publicly accessible NASA APIs (Insight, Rover Photos and the space 
              picture of the day).
            </p>          
        </section>
        <section>
            <h2>Repository</h2>
            <p>
              The code for this app is available at https://github.com/J8cob1/marsweatherapp.
            </p>          
        </section>
      </Base>
    </>
  );
}