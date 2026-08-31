const METEO_COORD_URL = "https://geocoding-api.open-meteo.com/v1/search?name=_METEO_CITY_&count=10&language=en&format=json";
const METEO_WEATHER_URL = "https://archive-api.open-meteo.com/v1/archive?latitude=_METEO_LAT_&longitude=_METEO_LON_&start_date=2026-08-01&end_date=2026-08-30&hourly=temperature_2m";

document.addEventListener("DOMContentLoaded", () => {

  // Coordinates
  document.querySelector("#get-weather").addEventListener("click", async () => {
    const input = document.querySelector("#city-name").value;
    const coordRes = await fetch(METEO_COORD_URL.replace("_METEO_CITY_", input));
    const coordData = await coordRes.json();
    const city0 = coordData.results[0];

    const weatherUrl = METEO_WEATHER_URL.replace("_METEO_LAT_", city0.latitude).replace("_METEO_LON_", city0.longitude);
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const temperatures = weatherData.hourly.temperature_2m;
    const times = weatherData.hourly.time;

    const hourlyTemperatures = [];
    for (let idx = 0; idx < times.length; idx++) {
      hourlyTemperatures.push({ time: times[idx], temperature: temperatures[idx] });
    }

    const svgWidth = 0; // TODO: get from #weather-svg
    const svgHeight = parseInt(0.66 * svgWidth);
    const leftMargin = 20;
    const bottomMargin = 40;
    const plotWidth = svgWidth - leftMargin;
    const plotHeight = svgHeight - bottomMargin;

    // size svg
    const svg = d3.select("#weather-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // TODO: xScale (scalePoint)
    // TODO: yScale (scaleLinear)

    // TODO: bind and draw data

    // TODO: x-axis
    // TODO: y-axis
  });
});
