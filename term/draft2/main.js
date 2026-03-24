"use strict";

/* SVG SETUP*/

// Define overall SVG size
let svgWidth = 750;
let svgHeight = 500;

// Create SVG container inside #chart div
let svg = d3.select("#chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Draw border around visualization area
svg.append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", svgWidth - 170)
    .attr("height", svgHeight - 100)
    .attr("fill", "none")
    .attr("stroke", "#333")
    .attr("stroke-width", 1);



/* GLOBAL VARIABLES  */

let xScale;


/*  LOAD DATA  */

// Load JSON dataset and pass to main function
d3.json("data.json").then(function (data) {
    buildVisualization(data);
});


/*  MAIN FUNCTION  */

// Controls overall flow of visualization
function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);
    drawVisualization(renderData);
}


/*  ORGANIZE DATA  */

// Currently returns data as-is (no transformation needed)
function organizeData(data) {
    return data;
}


/*  BUILD SCALES  */

// Creates xScale for positioning Morning and Night columns
function buildScales(data) {
    xScale = d3.scalePoint()
        .domain(["Morning", "Night"])
        .range([250, 450]);
}


/*  COLOR FUNCTION  */

// Returns color based on mental overload level
function getColor(overload) {

    // Low overload
    if (overload <= 2) {
        return "#ff7c7c";
    }

    // Medium overload
    if (overload <= 4) {
        return "#cd4040";
    }

    // High overload
    return "#720303";
}


/*  WIDTH FUNCTION  */

// Converts app switching count into rectangle width
function getWidth(switches) {
    return switches * 0.6;
}


/*  STROKE FUNCTION  */

// Returns stroke thickness based on notification count
function getStroke(notifications) {

    if (notifications < 70) {
        return 1;
    }

    if (notifications < 110) {
        return 2;
    }

    return 3;
}


/*  DRAW VISUALIZATION */

// Draws all elements (rectangles, labels, legend)
function drawVisualization(data) {

    let startY = 100;
    let rowHeight = 20;

    // Loop through each day in dataset
    for (let i = 0; i < data.length; i++) {

        let value = data[i];
        let y = startY + i * rowHeight;

        /*  DATE LABEL  */

        svg.append("text")
            .attr("x", 100)
            .attr("y", y + 15)
            .text(value.day)
            .attr("font-size", "12px");


        /*  MORNING RECTANGLE  */

        svg.append("rect")
            .attr("x", xScale("Morning"))
            .attr("y", y)
            .attr("width", getWidth(value.appSwitches))
            .attr("height", 10)
            .attr("fill", getColor(value.overload2pm))
            .attr("stroke-width", getStroke(value.notifications));


        /*  NIGHT RECTANGLE  */

        svg.append("rect")
            .attr("x", xScale("Night"))
            .attr("y", y)
            .attr("width", getWidth(value.appSwitches))
            .attr("height", 10)
            .attr("fill", getColor(value.overload10pm))
            .attr("stroke-width", getStroke(value.notifications));
    }


    /*  COLUMN LABELS  */

    svg.append("text")
        .attr("x", xScale("Morning"))
        .attr("y", 80)
        .attr("font-weight", "bold")
        .text("Morning");

    svg.append("text")
        .attr("x", xScale("Night"))
        .attr("y", 80)
        .attr("font-weight", "bold")
        .text("Night");

    svg.append("text")
        .attr("x", 132)
        .attr("y", 80)
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text("Date");


    /* TITLE  */

    svg.append("text")
        .attr("x", svgWidth / 2.5)
        .attr("y", 40)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .text("Time of the Day");



    // LEGEND BOX 

let legendX = 638;
let legendY = 90;

svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", 110)
    .attr("height", 100)
    .attr("fill", "none")
    .attr("stroke", "#4c4b4b")
    .attr("stroke-width", 0.5);
    

    /*  COLOR LEGEND  */
// Title
svg.append("text")
    .attr("x", legendX + 58)
    .attr("y", legendY - 3)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Overload");


// LOW
svg.append("rect")
    .attr("x", legendX + 10)
    .attr("y", legendY + 15)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "#ff7c7c");

svg.append("text")
    .attr("x", legendX + 35)
    .attr("y", legendY + 27)
    .text("Low");


// MEDIUM
svg.append("rect")
    .attr("x", legendX + 10)
    .attr("y", legendY + 45)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "#cd4040");

svg.append("text")
    .attr("x", legendX + 35)
    .attr("y", legendY + 57)
    .text("Medium");


// HIGH
svg.append("rect")
    .attr("x", legendX + 10)
    .attr("y", legendY + 75)
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", "#720303");

svg.append("text")
    .attr("x", legendX + 35)
    .attr("y", legendY + 87)
    .text("High");


    /*  WIDTH EXPLANATION  */

    svg.append("text")
        .attr("x", svgWidth / 2)
        .attr("y", 467)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .text("Rectangle width represents app switching frequency");
}