import Box from './box'

// A function components, since I don't know if I need anything else
export default function HistoryBox(props) {
  // Parase properties
  let date = props.date ? props.date : "";
  let sol = props.sol ? props.sol : "";
  let high = props.high ? props.high : "";;
  let low = props.low ? props.low : "";;
  let wind_direction = props.wind_direction ? props.wind_direction : "";;
  let wind_speed = props.wind_speed ? props.wind_speed : "";;
  let pressure = props.pressure ? props.pressure : "";;
  let season = props.season ? props.season : "";

  // Return HTML
  return (
    <Box minheight="400" minwidth="300">
      <h2>{date}</h2>
      <p><b>Sol: </b> {sol}</p>
      <p><b>High: </b>{high}° F</p>
      <p><b>Low: </b>{low}° F</p>
      <p><b>Most Common Wind Dir: </b>{wind_direction}</p>
      <p><b>Avg Hor. Wind Speed: </b>{wind_speed} m/s</p>
      <p><b>Pressure: </b>{pressure} Pascals</p>
      <p><b>Season: </b>{season.charAt(0).toUpperCase() + season.slice(1)}</p>
    </Box>
  );
}