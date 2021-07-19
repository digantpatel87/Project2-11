function init() {
    //Load Data
    
    /* data route */
    const wrestlingdataurl = "/api/wrestlingdata";
    

    // debugger;
    //var result = conn.query("SELECT * FROM wrestling;");
    d3.csv(wrestlingdataurl).then(function(response) {
      // console.log(response);

    var importedData = response;
    
        // console.log(importedData);
        var data = response;
        var selDataset = document.getElementById("selDataset");
        // debugger;
        // for (element in data.Name) {
        //   debugger;
        //     var opt = document.createElement("option");
        //     opt.value = data.Name[element];
        //     opt.innerHTML = data.Name[element];
        //     // then append it to the select element
        //     selDataset.appendChild(opt);
        // };


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
        // var initial_intvalue = selectedValue;


        // propertyNames = Object.entries(importedData);

        // function filterSamples(InitialData) {
        //   debugger;
        //     return InitialData.Name == initial_value;
        // }
        // debugger;
        for (var i = 0; i < importedData.length; i++) {
          if (importedData[i].Name == initial_value){
            filterdata = Object.entries(importedData[i]);
            break;
          }

        }



      //   filterdata = importedData.columns[2].filter(function(row) {
      //     return row == selectedValue ;
      // })
        console.log(filterdata)
        // function filtermetadata(InitialintData) {
        //     return InitialintData.id == initial_intvalue;
        // }

        // 2. Use filter() to pass the function as its argument
        // var filteredsamples = data.Name(filterSamples);
        // // var filteredmetaData = data.metadata.filter(filtermetadata);
        // // Rank,Name,Height,Weight,Rating,Votes,City,State,Country
        // // 3. Use the map method 
        // var Rank = filteredsamples.map(samples => samples.Rank);
        // var Name = filteredsamples.map(samplesm => samplesm.Name);
        // var Height = filteredsamples.map(samplest => samplest.Height);
        // var Weight = filteredsamples.map(samplest => samplest.Weight);
        // var Rating = filteredsamples.map(samplest => samplest.Rating);
        // var Votes = filteredsamples.map(samplest => samplest.Votes);
        // var City = filteredsamples.map(samplest => samplest.City);
        // var State = filteredsamples.map(samplest => samplest.State);
        // var Country = filteredsamples.map(samplest => samplest.Country);

        // var ethnicity = filteredmetaData.map(metadata => metadata.Weight);
        // var age = filteredmetaData.map(metadata => metadata.age);
        // var gender = filteredmetaData.map(metadata => metadata.gender);
        // var location = filteredmetaData.map(metadata => metadata.location);
        // var bbtype = filteredmetaData.map(metadata => metadata.bbtype);
        // var wfreq = filteredmetaData.map(metadata => metadata.wfreq);
      

        // Slice the first 10 objects for plotting
        // var Top10otu_ids = otu_ids[0].slice(0, 10);
        // var Top10sample_values = sample_values[0].slice(0, 10);
        // var Top10otu_labels = otu_labels[0].slice(0, 10);

        // Top10otu_idsWithAbv = Top10otu_ids.map(i => 'OTU ' + i);

        // var trace1 = {
        //     x: Top10sample_values,
        //     y: Top10otu_idsWithAbv,
        //     type: "bar",
        //     orientation: "h",
        //     text: Top10otu_labels
        //     // hovertext = Top10otu_labels
        // };

        // var Bardata = [trace1];

        // var layout = {
        //     title: "Data for " + initial_value
        // };

        // Plotly.newPlot("bar", Bardata, layout);

        // var trace2 = {
        //     x: otu_ids[0],
        //     y: sample_values[0],
        //     text: otu_labels[0],
        //     mode: 'markers',
        //     marker: {
        //       color: otu_ids[0],
        //     //   opacity: [1, 0.8, 0.6, 0.4],
        //       size: sample_values[0]
        //     }
        //   };
          
        //   var data = [trace2];
          
        //   var layout = {
        //     title: 'Marker Size and Color',
        //     showlegend: false,
        //     height: 600,
        //     width: 1200
        //   };
          
        //   Plotly.newPlot('bubble', data, layout);

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
          column.innerHTML = "Rank: " +  filterdata[1][1];
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
d3.csv(wwelatlon).then(function(response) {
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
                         "</h3><hr><p> BirthDate: " + FinalData[i].Birthday + "</p>"  ).addTo(myMap);
     }

});

// Initializes the page with a default plot
init();

