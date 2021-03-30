// File: header.js
// Date: 5/20/2020
// Purpose: contains the component for the header of the weather app

// A function components, since I don't know if I need anything else
// Might have had some help with this
export default function Header() {
    return (
    <>
    <nav className="color-primary" role="navigation">
      <h1>Mars Weather App</h1>
      <ul> 
        <li><a href=".">Current Weather</a></li>
        <li><a href="7dayhistory">7 Day History</a></li>
        <li><a href="charthistory">Chart History</a></li>
        <li><a href="about">About</a></li>
      </ul>
    </nav>

    <style jsx>{`
      nav {
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      nav * {
        padding: 5px;
      }
      nav h1 {
        padding-left: 10px;
      }
      nav ul {
        padding-right: 10px;
        padding-left: 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: center;
      }
      nav ul li {
        height: 20px;
        display: inline flow-root;
        padding-top: 10px;
        padding-left: 20px;
      }
      /* https://www.w3schools.com/css/css_link.asp */
      nav ul li a {
        text-decoration: none;
        color: white;
      }
      /* https://www.w3schools.com/css/css_link.asp */
      nav ul li a:hover {
        text-decoration: underline;
      }
    `}</style>
    </>
    )
}