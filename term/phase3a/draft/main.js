"use strict"

// CONFIGURATION VARIABLES

let svgWidth = 700;
let svgHeight = 500;
let margin = 35;


// RESIZE CONTAINER

d3.select("#container")
    .style("width", svgWidth + "px");


// CREATE SVG

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// DRAW BORDERS

svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

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


// DATASET (3 PROPERTIES)
// X = App Switches
// Y = Mental Overload
// Radius = Sleep Hours

let dataset = [
    { switchesPerDay: 110, dailyAvg: 3.5, sleepHours: 6 },
    { switchesPerDay: 142, dailyAvg: 4.5, sleepHours: 5 },
    { switchesPerDay: 156, dailyAvg: 4.5, sleepHours: 4.5 },
    { switchesPerDay: 128, dailyAvg: 4, sleepHours: 6 },
    { switchesPerDay: 135, dailyAvg: 4, sleepHours: 5.5 },
    { switchesPerDay: 85, dailyAvg: 2.5, sleepHours: 7.5 },
    { switchesPerDay: 60, dailyAvg: 1.5, sleepHours: 8 },
    { switchesPerDay: 75, dailyAvg: 2.5, sleepHours: 7 },
    { switchesPerDay: 95, dailyAvg: 3.5, sleepHours: 6.5 },
    { switchesPerDay: 148, dailyAvg: 4.5, sleepHours: 5 }
];


// SORT DATA (largest circles drawn first)

dataset.sort(function(a, b) {
    return b.sleepHours - a.sleepHours;
});


// SCALES

let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d.switchesPerDay; })])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d.dailyAvg; })])
    .range([svgHeight - margin, margin]);

let rScale = d3.scaleLinear()
    .domain([
        d3.min(dataset, function(d) { return d.sleepHours; }),
        d3.max(dataset, function(d) { return d.sleepHours; })
    ])
    .range([4, 14]);


// DRAW DATA POINTS

svg.selectAll("circle.dataPoint")
    .data(dataset)
    .join("circle")
    .attr("class", "dataPoint")
    .attr("cx", function(d) { return xScale(d.switchesPerDay); })
    .attr("cy", function(d) { return yScale(d.dailyAvg); })
    .attr("r", function(d) { return rScale(d.sleepHours); })
    .attr("fill", "black")
    .style("opacity", 0.8);


// AXIS LABELS

svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - margin / 3)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("App Switches (per day)");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -svgHeight / 2)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Daily Average Mental Overload (0–5 scale)");


// LOW & HIGH VALUE LABELS

svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - margin / 2)
    .attr("text-anchor", "middle")
    .text("0");

svg.append("text")
    .attr("x", svgWidth - margin)
    .attr("y", svgHeight - margin / 2)
    .attr("text-anchor", "middle")
    .text(d3.max(dataset, function(d) { return d.switchesPerDay; }));

svg.append("text")
    .attr("x", margin / 2)
    .attr("y", svgHeight - margin)
    .attr("text-anchor", "middle")
    .text("0");

svg.append("text")
    .attr("x", margin / 2)
    .attr("y", margin)
    .attr("text-anchor", "middle")
    .text(d3.max(dataset, function(d) { return d.dailyAvg; }));


// KEY (Sleep Hours → Radius)

let minSleep = d3.min(dataset, function(d) { return d.sleepHours; });
let maxSleep = d3.max(dataset, function(d) { return d.sleepHours; });
let avgSleep = (minSleep + maxSleep) / 2;

svg.append("text")
    .attr("x", svgWidth - 120)
    .attr("y", margin + 20)
    .style("font-weight", "bold")
    .text("Sleep Hours");

svg.append("circle")
    .attr("cx", svgWidth - 100)
    .attr("cy", margin + 50)
    .attr("r", rScale(minSleep))
    .attr("fill", "black");

svg.append("text")
    .attr("x", svgWidth - 80)
    .attr("y", margin + 55)
    .text(minSleep + " hrs");

svg.append("circle")
    .attr("cx", svgWidth - 100)
    .attr("cy", margin + 90)
    .attr("r", rScale(avgSleep))
    .attr("fill", "black");

svg.append("text")
    .attr("x", svgWidth - 80)
    .attr("y", margin + 95)
    .text(avgSleep + " hrs");

svg.append("circle")
    .attr("cx", svgWidth - 100)
    .attr("cy", margin + 140)
    .attr("r", rScale(maxSleep))
    .attr("fill", "black");

svg.append("text")
    .attr("x", svgWidth - 80)
    .attr("y", margin + 145)
    .text(maxSleep + " hrs");