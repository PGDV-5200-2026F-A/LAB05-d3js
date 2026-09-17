const METEO_COORD_URL = "https://geocoding-api.open-meteo.com/v1/search?name=_METEO_CITY_&count=10&language=en&format=json";
const METEO_WEATHER_URL = "https://archive-api.open-meteo.com/v1/archive?latitude=_METEO_LAT_&longitude=_METEO_LON_&start_date=2026-08-15&end_date=2026-09-15&hourly=temperature_2m";

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

    // console.log(weatherData);

    // TODO: combine temperatures and times into dataset (rows/columns)
    const times = weatherData.hourly.time;
    const temps = weatherData.hourly.temperature_2m;

    const data = [];
    for (let idx = 0; idx < times.length; idx = idx + 1) {
      data.push({
        time: times[idx],
        temp: temps[idx],
      });
    }
    // console.log(data);

    document.querySelector("#weather-svg").innerHTML = "";

    const svgWidth = document.querySelector("#weather-svg").clientWidth;
    const svgHeight = parseInt(0.66 * svgWidth);
    const leftMargin = 0;
    const bottomMargin = 0;
    const plotWidth = svgWidth - leftMargin;
    const plotHeight = svgHeight - bottomMargin;

    // size svg
    const svg = d3.select("#weather-svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // TODO: xScale (scalePoint)
    const xScale = d3.scalePoint()
      .domain(times)
      .range([0, plotWidth]);

    // TODO: yScale (scaleLinear)
    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.temp), d3.max(data, d => d.temp)])
      .range([plotHeight, 0]);

    // TODO: bind and draw data
    svg.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScale(d.time))
      .attr("cy", d => yScale(d.temp))
      .attr("r", 2);

    // TODO: x-axis
    // TODO: y-axis
  });
});
