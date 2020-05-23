// File Base.js
// Will contain header and footer
import Header from './header'
import Footer from './footer'

// A function components, since I don't know if I need anything else
export default function Base({ bodyHTML }) {
    return (
        <div className="flex">
        <Header></Header>
        <div className="color-light flex-grow">{bodyHTML}
          <p>sdfsd</p>
        </div>
        <Footer></Footer>

        <style jsx>{`
            div {
                width: 100%;
                height: 100%;
                flex-grow: 1;
            }
            .flex-grow {
                flex-grow: 1;
            }
            .flex {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-wrap: nowrap;
            }
        `}</style>
        </div>
    )
}