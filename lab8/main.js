"use strict";

/**** CONFIGURATION VARIABLES ****/
let svgWidth = 800;
let svgHeight = 600;

let leftMargin = 80;
let rightMargin = 40;
let topMargin = 80;
let bottomMargin = 80;

/**** DATASET (Min 6 observations) ****/
let dataset = [
    { switches: 110, overload: 3.5, time: 240, stress: 65 },
    { switches: 142, overload: 4.5, time: 310, stress: 80 },
    { switches: 156, overload: 4.8, time: 330, stress: 90 },
    { switches: 60, overload: 2.1, time: 120, stress: 40 },
    { switches: 85, overload: 2.8, time: 160, stress: 50 },
    { switches: 125, overload: 3.9, time: 270, stress: 70 }
];

/**** SORT DATA (Large circles drawn first)  ****/
dataset.sort(function(a, b) {
    return b.time - a.time;
});

/**** CREATE SVG CANVAS ****/
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("display", "block")
    .style("margin", "auto");

/**** CREATE SCALES ****/
let xScale = d3.scaleLinear()
    .domain([0, 160])
    .range([leftMargin, svgWidth - rightMargin]);

let yScale = d3.scaleLinear()
    .domain([0, 5])
    .range([svgHeight - bottomMargin, topMargin]);

/* Circle size scale - Square Root scale is taught for bubble area  */
let radiusScale = d3.scaleSqrt()
    .domain([120, 330])
    .range([6, 35]);

/**** DRAW DATA BUBBLES - Using standard function syntax ****/
svg.selectAll("circle")
    .data(dataset)
    .join("circle")
    .attr("cx", function(d) { return xScale(d.switches); })
    .attr("cy", function(d) { return yScale(d.overload); })
    .attr("r", function(d) { return radiusScale(d.time); })
    .attr("fill", function(d) {
        if (d.stress < 50) { return "#66c2ff"; }
        else if (d.stress < 75) { return "#ffcc66"; }
        else { return "#ff6666"; }
    })
    .style("opacity", 0.75)
    .attr("stroke", "white"); 

/**** X AXIS LABELS - Using Backticks  ****/
for (let i = 0; i <= 160; i += 40) {
    svg.append("text")
        .attr("x", xScale(i))
        .attr("y", svgHeight - bottomMargin + 25)
        .attr("text-anchor", "middle")
        .text(`${i}`); 
}

/**** Y AXIS LABELS ****/
for (let i = 0; i <= 5; i += 1) {
    svg.append("text")
        .attr("x", leftMargin - 10)
        .attr("y", yScale(i))
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .text(`${i}`);
}

/**** DRAW AXIS LINES ****/

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(160))
    .attr("y2", yScale(0))
    .attr("stroke", "black");

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(0))
    .attr("y2", yScale(5))
    .attr("stroke", "black");

/**** AXIS TITLES ****/

svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - 30)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Number of App Switches per Day");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -svgHeight / 2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Mental Overload Level (0–5)");

let keyX = 170;
let keyY = 120;
let colorKeyY = 320;
let sizes = [120, 240, 330];

/**** SIZE KEY BOX ****/

svg.append("rect")
    .attr("x", keyX - 50)
    .attr("y", keyY - 50)
    .attr("width", 200)
    .attr("height", 170)
    .attr("fill", "none")
    .attr("stroke", "black");

svg.append("text")
    .attr("x", keyX + 40)
    .attr("y", keyY - 25)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .text("Daily Phone Time");

/**** SIZE KEY - Using For Loop ****/

for (let i = 0; i < sizes.length; i++) {
    svg.append("circle")
        .attr("cx", keyX)
        .attr("cy", keyY + i * 45)
        .attr("r", radiusScale(sizes[i]))
        .attr("fill", "gray")
        .style("opacity", 0.6);

    svg.append("text")
        .attr("x", keyX + 45)
        .attr("y", keyY + i * 45)
        .attr("alignment-baseline", "middle")
        .text(`${sizes[i]} mins`);
}

/**** COLOR KEY BOX ****/

svg.append("rect")
    .attr("x", keyX - 30)
    .attr("y", colorKeyY - 40)
    .attr("width", 170)
    .attr("height", 120)
    .attr("fill", "none")
    .attr("stroke", "black");

svg.append("text")
    .attr("x", keyX + 40)
    .attr("y", colorKeyY - 15)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .text("Stress Levels");
    


/**** COLOR KEY - Using For Loop ****/
let colorData = [
    {label: "Low Stress", color: "#66c2ff"},
    {label: "Med Stress", color: "#ffcc66"},
    {label: "High Stress", color: "#ff6666"}
];

for (let i = 0; i < colorData.length; i++) {
    svg.append("rect")
        .attr("x", keyX - 10)
        .attr("y", colorKeyY + i * 30)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", colorData[i].color);

    svg.append("text")
        .attr("x", keyX + 20)
        .attr("y", colorKeyY + i * 30 + 10)
        .attr("alignment-baseline", "middle")
        .style("font-size", "11px")
        .text(`${colorData[i].label}`);
}