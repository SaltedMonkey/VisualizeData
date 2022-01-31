const Dummy = [
    {id: "d1", value: 10, region: "USA"},
    {id: "d2", value: 12, region: "Germany"},
    {id: "d3", value: 15, region: "ASIA"},
    {id: "d4", value: 10, region: "EU"}

];


const xScale = d3.scaleBand().domain(Dummy.map(data => data.region)).rangeRound([0, 250]).padding(0.2);
const yScale = d3.scaleLinear().domain([0, 25]).range([200, 0]);

console.log("we are here in app.js");
const container = d3.select("svg")
    .classed("container", true);

const bars = container
    .selectAll(".bar")
    .data(Dummy)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", xScale.bandwidth())
    .attr("height", (data) => 200-yScale(data.value))
    .attr("x", data => xScale(data.region))
    .attr("y", data => yScale(data.value));




