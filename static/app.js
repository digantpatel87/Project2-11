function init() {
  //Load Data

  /* data route */
  const wrestlingdataurl = "/api/wrestlingdata";

  d3.csv(wrestlingdataurl).then(function (response) {
    // console.log(response);

    var importedData = response;

    var data = response;
    var selDataset = document.getElementById("selDataset");

    for (var i = 0; i < data.length; i++) {
      // debugger;
      var opt = document.createElement("option");
      opt.value = data[i].Name;
      opt.innerHTML = data[i].Name;
      // then append it to the select element
      selDataset.appendChild(opt);
    }

    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable

    var selectedValue = dropdownMenu.property("value");

    var initial_value = selectedValue;

    for (var i = 0; i < importedData.length; i++) {
      if (importedData[i].Name == initial_value) {
        filterdata = Object.entries(importedData[i]);
        break;
      }

    }



    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: filterdata[5][1],
        title: { text: "Wrestler's Rating" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 4 },
        gauge: { axis: { range: [null, 10] } }
      }
    ];

    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', data, layout);

    var metadatadiv = document.getElementById("sample-metadata");
    var metadatatable = document.createElement("table");
    var row = document.createElement("tr");
    var column = document.createElement("td");
    // Rank,Name,Height,Weight,Rating,Votes,City,State,Country
    // debugger;
    metadatadiv.innerHTML = "";
    column.innerHTML = "Name: " + filterdata[2][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "Rank: " + filterdata[1][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "Height: " + filterdata[3][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "Weight: " + filterdata[4][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "Rating: " + filterdata[5][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "Votes: " + filterdata[6][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "City: " + filterdata[7][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "State: " + filterdata[8][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    row = document.createElement("tr");
    column = document.createElement("td");
    column.innerHTML = "Country: " + filterdata[9][1];
    row.appendChild(column);
    metadatatable.appendChild(row);

    metadatadiv.appendChild(metadatatable);
  });
}

d3.selectAll("#selDataset").on("change", init);

const wwelatlon = "/api/wwelatlon";
d3.csv(wwelatlon).then(function (response) {
  var FinalData = response;
  // debugger;
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    // layers: [streetmap]
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);



  // Add circles to map
  for (var i = 0; i < FinalData.length; i++) {

    //  debugger;
    L.circleMarker([FinalData[i].Latitude, FinalData[i].Longitude], {
      fillOpacity: 0.75,
      color: "blue",
      //fillColor: color,
      // Adjust radius
      radius: 7
    }).bindPopup("<h3> Name:" + FinalData[i].Gimmick +
      "</h3><hr><p> Birthplace: " + FinalData[i].Birthplace + "</p>" +
      "</h3><hr><p> BirthDate: " + FinalData[i].Birthday + "</p>").addTo(myMap);
  }

});

// Initializes the page with a default plot
init();

