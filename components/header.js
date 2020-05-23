// File: header.js
// Date: 5/20/2020
// Purpose: contains the component for the header of the weather app

// A function components, since I don't know if I need anything else
// Might have had some help with this
export default function Header() {
    return (
    <>
        <nav className="color-primary">
            <h1>Mars Weather App</h1>
            <ul>
                <li><a href="">Index</a></li>
                <li><a href="">7 Day History</a></li>
                <li><a href="">Chart History</a></li>
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
            nav ul {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-end;
            }
            nav ul li {
                height: 100%;
                display: inline;
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