// File Box.js

// A function components, since I don't know if I need anything else
export default function Box({ children }) {
    return (
        <div className="color-dark">
            {children}
            <style jsx>{`
                div {
                    min-width: 300px; /**/
                    min-height: 300px;
                    text-align: center;
                    margin: 10px;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    )
}