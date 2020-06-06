// A function components, since I don't know if I need anything else
// Might have had some help with this
export default function Footer(props) {
  let footerMessage = "";
  if (props.copyright) {
    footerMessage += "Background image copyright @" + props.copyright;
  }

  return (
  <>
  <footer className="color-primary">
    <p>
      Powered by Node, Next.js and React. I hope you enjoy!
      Favicon courtesy of <a href="https://www.iconfinder.com/brian_ondari">Brian Ondari</a> from IconFinder, licensed under the <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a> license
      <br /><b>Note:</b> some of the latest data may not be super accurate, since not many measurements have come in yet
      {footerMessage}
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