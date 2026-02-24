"use strict"


// CONFIGURATION VARIABLES
// Controls SVG size and margins

let svgWidth = 600;
let svgHeight = 400;
let margin = 25;


// RESIZE CONTAINER TO MATCH SVG WIDTH

d3.select("#container")
    .style("width", svgWidth + "px");


// CREATE SVG CANVAS

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// DRAW OUTER BORDER

svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// DRAW MARGIN BORDER

svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);


 // GRAPH TITLE

svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", margin / 1.5)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .style("font-size", "14px")
    .text("Relationship Between App Switching and Mental Overload");

 // DATASET
 // X: App Switches (per day)
 // Y: Daily Average Mental Overload (0-5 scale)

let dataset = [
    { switchesPerDay: 110, dailyAvg: 3.5 },
    { switchesPerDay: 142, dailyAvg: 4.5 },
    { switchesPerDay: 156, dailyAvg: 4.5 },
    { switchesPerDay: 128, dailyAvg: 4 },
    { switchesPerDay: 135, dailyAvg: 4 },
    { switchesPerDay: 85, dailyAvg: 2.5 },
    { switchesPerDay: 60, dailyAvg: 1.5 },
    { switchesPerDay: 75, dailyAvg: 2.5 },
    { switchesPerDay: 95, dailyAvg: 3.5 },
    { switchesPerDay: 148, dailyAvg: 4.5 }
];

// CREATE SCALES
// Maps data values to pixel positions

let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.switchesPerDay)]) // 0 to max switches
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.dailyAvg)]) // 0 to max overload
    .range([svgHeight - margin, margin]);

// DRAW DATA POINTS

svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("r", 8)
    .attr("cx", d => xScale(d.switchesPerDay))
    .attr("cy", d => yScale(d.dailyAvg))
    .attr("fill", "black")
    .style("opacity", 0.8); // optional, reduces overlap

//  X AXIS LABEL

svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - margin / 3)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("App Switches (per day)");

 // Y AXIS LABEL

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -svgHeight / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Daily Average Mental Overload (0–5 scale)");


 // LOW AND HIGH VALUE LABELS

svg.append("text") // X-axis low
    .attr("x", margin)
    .attr("y", svgHeight - margin / 2)
    .attr("text-anchor", "middle")
    .text("0");

svg.append("text") // X-axis high
    .attr("x", svgWidth - margin)
    .attr("y", svgHeight - margin / 2)
    .attr("text-anchor", "middle")
    .text(d3.max(dataset, d => d.switchesPerDay));

svg.append("text") // Y-axis low
    .attr("x", margin / 2)
    .attr("y", svgHeight - margin)
    .attr("text-anchor", "middle")
    .text("0");

svg.append("text") // Y-axis high
    .attr("x", margin / 2)
    .attr("y", margin)
    .attr("text-anchor", "middle")
    .text(d3.max(dataset, d => d.dailyAvg));