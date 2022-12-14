function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("static/js/samples.json").then((data) => {
      // console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildCharts(firstSample);
    });
}
  
// Initialize the dashboard
init();

// Fetch new data each time a new sample is selected
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

// Demographics Panel
function buildMetadata(sample) {
    d3.json("static/js/samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }

  // Deliverable 1
  // 1.1. Create the buildCharts function.
  function buildCharts(sample) {
    // 1.2. Use d3.json to load and retrieve the samples.json file 
    d3.json("static/js/samples.json").then((data) => {
      // 1.3. Create a variable that holds the samples array(s). Also for Deliverable 3 grab metadata array.
      var samples = data.samples;
      var metadata = data.metadata;

      // 1.4. Create a variable that filters the samples for the object with the desired sample number.
      // 3.1. Create a variable that filters the metadata array for the object with the desired sample number.
      var sampleArray = samples.filter(sampleID => sampleID.id == sample);
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

      //  1.5. Create a variable that holds the first sample in the array.
      //  3.2. Create a variable that holds the first sample in the metadata array.
      var sampleResults = sampleArray[0];
      var result = resultArray[0];

      // console.log(sampleResults)
      // console.log(result)
  
      // 1.6. Create variables that hold the otu_ids, otu_labels, and sample_values. (also required for Deliverables 2,3)
      var otuIDs = Object.values(sampleResults.otu_ids);
      var otuLabels = Object.values(sampleResults.otu_labels);
      var sampleValues = Object.values(sampleResults.sample_values);
        
      // 1.7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
      var yticks = otuIDs.slice(0,10).map(otuID => `OTU ${otuID}`).reverse()
  
      // 1.8. Create the trace for the bar chart. 
      var barData = [{
        x: sampleValues.slice(0,10).reverse(),
        y: yticks,
        text: otuLabels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
      }];
      // 1.9. Create the layout for the bar chart. 
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found"
      };
      // 1.10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout);

      // Deliverable 2
      // 2.1. Create the trace for the bubble chart.
      var desired_maximum_marker_size = 120;
      var bubbleData = [{
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
            color: otuIDs,
            size: sampleValues,
            opacity: .8,
            // Adjusted size of the markers to avoid having overlap and make the visual cleaner
            sizeref: 2.0 * Math.max(...sampleValues) / (desired_maximum_marker_size**2),
            sizemode: 'area'
        }
      }];
      
      // 2.2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"},
        showlegend: false
      };
      // 2.3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

      // Deliverable 3

      // 3. Create a variable that holds the washing frequency.
      selectedWfreq = parseFloat(result.wfreq)

      // 4. Create the trace for the gauge chart.
      var gaugeData = [{
        domain: {x: [0,1], y: [0,1]},
        value: selectedWfreq,
        title: {text: "Washing Frequency"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 10], dtick: 2 },
            bar: { color: "black" },
            steps: [
                { range: [0,2], color: "saddlebrown" },
                { range: [2,4], color: "burlywood"},
                { range: [4,6], color: "cornflowerblue"},
                { range: [6,8], color: "lightblue"},
                { range: [8,10], color: "lavender"}
            ]
        }
      }];

      // 5. Create the layout for the gauge chart.
      var gaugeLayout = {
        margin: {t: 0, b: 0}
      };

      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
  }
  