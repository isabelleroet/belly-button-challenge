function buildMetadata(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let metadata = data.metadata;
    // let sample is a variable name 
    //filters through metadata
    //object is a dictionary 
    //[0] makes dictionary instead of list so we can pull out keys and values 
   let sampleObject = metadata.filter(obj=>obj.id==sample)[0];
    
    //d3 allows us to connect to the dom (document object model) or interface for our visualizations 
    //sample metadata on html is set equal to id, which has our values and pairs we want on our visualization 
    //see html, boostrap is similar to calling in a library in pandas for our visualizations
    //panel is a bootstrap class  
    let panel = d3.select("#sample-metadata");

    //this allows dropdown to not append and just show the value we want (remember ta example)
    panel.html("")

    //sampleobject is a dictionary, for the key (can be renamed to anything) in the sampleobject 
    //key is like the title values (remember key value pairs, id/name/ethnicity/etc.) 
    //h6 h4 or h5 changes header size 
    //key is unpacked in forloop, to get value we must reference sampleObject by key for value  
    for(key in sampleObject){panel.append("h6").text(`${key}: ${sampleObject[key]}`)}
    
  });
}

function buildCharts(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

    // Build a Bubble Chart
   let bubble = data.samples.filter(obj=>obj.id==sample)[0]; let bubbleData = [{x:bubble.otu_ids, y:bubble.sample_values, text:bubble.otu_labels, mode: "markers", marker: {size: bubble.sample_values, color: bubble.otu_ids}}] 
   let bubbleLayout = {title: "OTU ID"}

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    //this is your bar chart and the slice shows the first 10 values
    //.reverse shows in descending order 
    //plotly uses plotly to plot data
    let bar = data.samples.filter(obj=>obj.id==sample)[0]; let barData = [{x:bar.sample_values.slice(0,10).reverse(), y:bar.otu_ids.slice(0, 10).map(obj=>`OTU ${obj}`).reverse(), text:bar.otu_labels.slice(0, 10).reverse(), type: "bar", orientation: "h"}] 
    Plotly.newPlot("bar", barData);

  })}
function init() {
  // Grab a reference to the dropdown select element
  let select = d3.select("#selDataset");
  //for every name in the list, make an option tag, give it the text of the name and the value of the name 
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    for(let i = 0; i < data.names.length; i++){select.append("option").text(data.names[i]).property("value",data.names[i])}  
    buildMetadata(data.names[0]);
    buildCharts(data.names[0])
  });
}

function optionChanged(newSample) {
  // get new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample)
}

init();