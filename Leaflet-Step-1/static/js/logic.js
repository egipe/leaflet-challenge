// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(myMap);

// call API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Define a markerSize function that will give each earthquake size based on magnitude
function markerSize(magnitude) {
  return magnitude * 20000;
}

// Define markerColor function that will give each earthquake color based on depth
// added to if statement

// use d3 to get data
d3.json(url).then(function(data){

  // Loop through locations and create city and state markers
  //console.log(data.features.length)
  for (var i = 0; i < data.features.length; i++) {
    console.log(data.features.length)
    // declare variables
    var lat = data.features[i].geometry.coordinates[1];
    var lon = data.features[i].geometry.coordinates[0];
    var latlon = [lat,lon];
    var mag = data.features[i].properties.mag;
    var depth = data.features[i].geometry.coordinates[2];
    var place = data.features[i].properties.place;
    console.log(place)

    var fill = "";
    if (depth > 90) {
      fill = "red"
    }
    else if (depth > 70) {
      fill = "orange"
    }
    // else if (depth > 50) {
    //   fill = "light orange"
    // }
    else if (depth > 30) {
      fill = "yellow"
    }
    // else if (depth > 10) {
    //   fill = "light green"
    // }
    else {
      fill = "green"
    }

    //Setting the marker radius 
    L.circle(latlon, {
      stroke: false,
      fillOpacity: 0.75,
      color: fill,
      fillColor: fill,
      radius:markerSize(mag)
    }).addTo(myMap)
  }
});

// create the legend 
// Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }
