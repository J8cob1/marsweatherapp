// File Box.js

// A function components, since I don't know if I need anything else
export default function Box(props) {
  // Parase properties
  let width = "";
  let height = "";
  if (props.minheight != undefined) {
    height = "min-height: " + props.minheight + "px;";
  }
  else if(props.absheight != undefined) {
    height = "height: " + props.absheight + "px;";
  }
  if (props.minwidth != undefined) {
    width = "min-width: " + props.minwidth + "px;";
  }
  else if(props.abswidth != undefined) {
    height = "width: " + props.abswidth + "px;";
  }

  // Return HTML
  return (
    <div className="color-dark">
      {props.children}
      <style jsx>{`
        div {
          ${width}
          ${height}
          text-align: center;
          margin: auto;
          border-radius: 10px;
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}