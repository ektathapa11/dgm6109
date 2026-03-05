"use strict";

/**** CONFIGURATION VARIABLES ****/
let svgWidth = 600;
let svgHeight = 400;
let margin = 60;

/**** DATASET (minimum 6 observations) ****/
let dataset = [
    { switches: 110, overload: 3.5 },
    { switches: 142, overload: 4.5 },
    { switches: 156, overload: 4.8 },
    { switches: 60, overload: 2.1 },
    { switches: 85, overload: 2.8 },
    { switches: 125, overload: 3.9 }
];

/**** CREATE SVG CANVAS ****/
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("display", "block")
    .style("margin", "auto");

    svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

/**** CREATE SCALES ****/
let xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d){ return d.switches; })])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d){ return d.overload; })])
    .range([svgHeight - margin, margin]);

/**** DRAW MARGIN BORDER ****/
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

/**** DRAW DATA POINTS ****/
svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("r", 7)
    .attr("cx", function(value) {
        return xScale(value.switches);
    })
    .attr("cy", function(value) {
        return yScale(value.overload);
    })
    .attr("fill", "black")
    .style("opacity", 0.7);

/**** X AXIS LABELS (for loop) ****/
for (let i = 0; i <= 160; i += 40) {
    svg.append("text")
        .attr("x", xScale(i))
        .attr("y", svgHeight - (margin / 2))
        .attr("text-anchor", "middle")
        .text(String(i));
}

/**** Y AXIS LABELS (for loop) ****/
for (let i = 0; i <= 5; i += 1) {
    svg.append("text")
        .attr("x", margin * 0.8)
        .attr("y", yScale(i))
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .text(String(i));
}

/**** AXIS TITLES ****/
svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - 10)
    .attr("text-anchor", "middle")
    .text("App Switches per Day");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -svgHeight / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Mental Overload Level (0-5)");

