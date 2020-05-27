// A function components, since I don't know if I need anything else
// Might have had some help with this
export default function Footer(props) {
    return (
    <>
    <footer>
        <p>Powered by Node, Next.js and React. 
           I hope you enjoy! Favicon courtesy of <a href="https://www.iconfinder.com/iconka">Denis Sazhin</a> from IconFinder. 
        </p>
    </footer>

    <style jsx>{`
        footer * {
            padding: 5px;
        }
        footer {
            color: white;
            text-align: center;
            width: 100%;
        }
    `}</style>
    </>
    )
}