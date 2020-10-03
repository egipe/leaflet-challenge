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
  return magnitude * 1000;
}

// Define markerColor function that will give each earthquake color based on depth
// added to if statement

// use d3 to get data
d3.json(url).then(function(data){

  // was instructed to do features.on but could not figure it out within the timeframe
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: "
          + feature.properties.mag
          + "<br>Depth: "
          + feature.geometry.coordinates[2]
          + "<br>Location: "
          + feature.properties.place
      );
    }
  }).addTo(map);

  // Loop through locations and create city and state markers
  for (var i = 0; i < data.features.length; i++) {
    // declare variables
    var lat = data[i].features.geometry.coordinates[1];
    var lon = data[i].features.geometry.coordinates[0];
    var latlon = [lat,lon];
    var mag = data[i].features.properties.mag;
    var depth = data[i].features.properties.geometry.coordinates[2];
    var place = data[i].features.properties.place;

    var fill = "";
    if (depth > 90) {
      return "red"
    }
    else if (depth2 > 70) {
      return "dark orange"
    }
    else if (depth > 50) {
      return "light orange"
    }
    else if (depth > 30) {
      return "yellow"
    }
    else if (depth > 10) {
      return "light green"
    }
    else {
      return "dark green"
    }


    //Setting the marker radius 
    L.circle(latlon[i], {
      stroke: false,
      fillOpacity: 0.75,
      color: "fill",
      // fillColor: "fill",
      //markerColor(depth2),
      radius:markerSize(mag)
      .addto(myMap)
    })
  }
});

// control layer

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
