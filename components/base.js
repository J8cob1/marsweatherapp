// File Base.js
// Will contain header and footer
import Header from './header'
import Footer from './footer'
import { Children } from 'react'

// Gets Mars Weather Data From NASA
export async function getStaticProps(context) {
  // https://stackoverflow.com/questions/4870328/read-environment-variables-in-node-js
  let apiKey = process.env.NASA_API_KEY;

  console.log("We Propped")

  // Get Astronomy Picture of the day. We will use it as a background image
  let APOTDQuery = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
  APOTDQuery = await APOTDQuery.json();

  return {
    props: {
      apic_pic: APOTDQuery.hdurl,
      apic_copyright: APOTDQuery.hasOwnProperty("copyright") ? APOTDQuery.copyright : "",
    }
  };
}

// A function components, since I don't know if I need anything else
export default class Base extends React.Component {
  /*static async getStaticProps(context) {
    // https://stackoverflow.com/questions/4870328/read-environment-variables-in-node-js
    let apiKey = process.env.NASA_API_KEY;
      
        console.log("We Propped")
      
    // Get Astronomy Picture of the day. We will use it as a background image
    let APOTDQuery = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    APOTDQuery = await APOTDQuery.json();
      
    return {
      props: {
        apic_pic: APOTDQuery.hdurl,
        apic_copyright: APOTDQuery.hasOwnProperty("copyright") ? APOTDQuery.copyright : "",
      }
    };
  }*/

  render() {
    let pictureURL = "";
    let copyright = "";
    if (this.props.pictureURL) {
        pictureURL = this.props.pictureURL;
    }
    if (this.props.copyright) {
        copyright = this.props.copyright;
    }

    return (
        <div className="flex">
        <Header></Header>
        <div className="color-light flex-grow">
            {this.props.children}
        </div>
        <Footer copyright={copyright}></Footer>

        <style jsx>{`
            div {
                width: 100%;
                height: 100%;
                flex-grow: 1;
                background-image: url(${pictureURL});
                background-size: cover;
            }
            .flex-grow {
                flex-grow: 1;
            }
            .flex {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-wrap: nowrap;
                height: 100%;
            }
        `}</style>
        </div>
    );
  }
}