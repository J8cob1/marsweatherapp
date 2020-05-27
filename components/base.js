// File Base.js
// Will contain header and footer
import Header from './header'
import Footer from './footer'
import { Children } from 'react'

// A function components, since I don't know if I need anything else
export default function Base({ children }) {
    return (
        <div className="flex">
        <Header></Header>
        <div className="color-light flex-grow">
            {children}
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