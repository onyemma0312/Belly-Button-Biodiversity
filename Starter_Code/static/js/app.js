/***********************************************/
function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
    // Fetch new data each time a new sample is selected
    createBarchart(newSample)
    createBubbleChart(newSample);
    buildMetadata(newSample);
}
/***********************************************/
function buildMetadata(sample) {
    // write code to create the buildMetadata
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data)=>{
        var metadata = data.metadata;
        var results = metadata.filter(sampleobject=>sampleobject.id==sample);
        var result = results[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key,value])=>{
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
            
        });
            buildGauge(result.wfreq);
    
    });
    // bonus only
    

}
/***********************************************/
function createBubbleChart(sample) {
    // write code to create the BubbleChart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var results = samples.filter(sampleobject=>sampleobject.id==sample);
        var result = results[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var layout = {
            title: "Bacteria_Culture"

        };
        var data = [
            {
                x:otu_ids,
                y:sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
                
            }
        ];
        Plotly.newPlot("bubble", data, layout);
    });
}
/***********************************************/
/***********************************************/
function createBarchart(sample) {
    // write code to create barchart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("samples.json").then((data)=>{
        var datasamples = data.samples;
        var results = datasamples.filter(sampleobject=>sampleobject.id==sample);
        var result = results[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
    var trace1 = {
        type: 'bar',
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        orientation: 'h', 
        
        // marker: {
        //     color: '#C8A2C8',
        //     line: {
        //         width: 2.5
        //     }
        // }
      };
      
      var data = [ trace1 ];
      
      var layout = { 
        // title: 'Responsive to window\'s size!',
        margin: { t: 30, l: 150 },
        font: {size: 18}
      };
      
      var config = {responsive: true}
      
      Plotly.newPlot('bar', data, layout, config );
});
}
/***********************************************/
function fillDropDown() {
  // write code to pupulate the dropdown
  console.log(`Entering ${arguments.callee.name}`)
  var dropdown = d3.select("#selDataset");
  d3.json("samples.json").then((data)=>{
    var samplenames = data.names;
    samplenames.forEach((sample)=>{
        dropdown
        .append("option")
        .text(sample)
        .property("value",sample)
        var firstsample = samplenames[0];
        buildMetadata(firstsample);
        createBubbleChart(firstsample);
        createBarchart(firstsample)
    });

});

  
}
/***********************************************/

fillDropDown()