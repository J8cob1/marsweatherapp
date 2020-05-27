export default function celciusToFehrenheit(temp) {
    // Formula from Google (lookup "Celcius to Fehrenheit" for formula)
    // Rounding inspired by NASA Mars weather dashboard at https://mars.nasa.gov/insight/weather/ (they have another as well for a different part of mars)
    return Math.round((temp * 9/5) + 32);
}