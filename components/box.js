// File Box.js

// A function components, since I don't know if I need anything else
export default function Box({ childeren }) {
    return (
        <div className="color-light">
            {childeren}
            <style jsx>{`
                div {
                    border: 10px solid white;
                    min-width: 150px; /**/
                    min-height: 150px;
                    max-width: 200px;
                }
            `}</style>   
        </div>
    )
}