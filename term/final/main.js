"use strict";

/* SVG SETUP*/

// setting the overall size of the svg
let svgWidth = 1100;
let svgHeight = 700;

// creating the svg inside the div with id "chart"
let svg = d3.select("#chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// drawing a border around the main visualization area
svg.append("rect")
    .attr("x", 190)
    .attr("y", 35)
    .attr("width", svgWidth - 500)
    .attr("height", svgHeight - 50)
    .attr("fill", "none")
    .attr("stroke", "#333")
    .attr("stroke-width", 1);


/* GLOBAL VARIABLES  */

// this will control where morning and night are placed horizontally
let xScale;


/*  LOAD DATA  */

// loading data from json file and sending it to main function
d3.json("data.json").then(function (data) {
    buildVisualization(data);
});


/*  MAIN FUNCTION  */

// main function that runs everything
function buildVisualization(data) {
    let renderData = organizeData(data); // preparing data
    buildScales(renderData); // setting up scales
    drawVisualization(renderData); // drawing everything
}


/*  ORGANIZE DATA  */

// right now just returning data as it is
function organizeData(data) {
    return data;
}


/*  BUILD SCALES  */

// creating x scale for positioning morning and night
function buildScales(data) {
    xScale = d3.scalePoint()
        .domain(["Morning", "Night"]) // two categories
        .range([400, 600]); // where they appear on screen
}


/*  COLOR FUNCTION  */

// deciding color based on overload value
function getColor(overload) {

    // low overload
    if (overload <= 2) {
        return "#ff7c7c";
    }

    // medium overload
    if (overload <= 4) {
        return "#cd4040";
    }

    // high overload
    return "#720303";
}


/*  WIDTH FUNCTION  */

// converting app switches into rectangle width
function getWidth(switches) {
    return switches * 0.6; // scaling it down to fit screen
}


/*  STROKE FUNCTION  */

// deciding border thickness based on notifications
function getStroke(notifications) {

    if (notifications < 70) {
        return 1; // thin
    }

    if (notifications < 110) {
        return 2; // medium
    }

    return 3; // thick
}


/*  DRAW VISUALIZATION */

// draws all elements like bars, labels, and legends
function drawVisualization(data) {

let startY = 90; // starting position for first row
let rowHeight = 15; // spacing between rows

// loop through each day
for (let i = 0; i < data.length; i++) {

    let value = data[i];
    let y = startY + i * rowHeight; // vertical position for each row

/*  DATE LABEL  */

// adding date text on left side
    svg.append("text")
    .attr("x", 290)
    .attr("y", y + 15)
    .text(value.day)
    .attr("font-size", "11px");


/*  MORNING RECTANGLE  */

// drawing morning bar
    svg.append("rect")
        .attr("x", xScale("Morning"))
        .attr("y", y)
        .attr("width", getWidth(value.appSwitches)) // width shows app switching
        .attr("height", 7)
        .attr("fill", getColor(value.overload2pm)) // color shows overload
        .attr("stroke", "#232323")
        .attr("stroke-width", getStroke(value.notifications)); // stroke shows notifications
            

/*  NIGHT RECTANGLE  */

// drawing night bar
    svg.append("rect")
        .attr("x", xScale("Night"))
        .attr("y", y)
        .attr("width", getWidth(value.appSwitches))
        .attr("height", 7)
        .attr("fill", getColor(value.overload10pm))
        .attr("stroke", "#232323")
        .attr("stroke-width", getStroke(value.notifications));
            
 }

// drawing x-axis line at bottom
 svg.append("line")
    .attr("x1", 270)
    .attr("y1", svgHeight - 60)
    .attr("x2", 715)
    .attr("y2", svgHeight - 60)
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

// drawing y-axis line on left    
 svg.append("line")
    .attr("x1", 270)
    .attr("y1", 60)
    .attr("x2", 270)
    .attr("y2", svgHeight - 60)
    .attr("stroke", "#000")
    .attr("stroke-width", 1);


/*  COLUMN LABELS  */

// labels for morning and night columns
svg.append("text")
    .attr("x", xScale("Morning"))
    .attr("y", 80)
    .attr("font-weight", "light")
    .text("Morning (9am-2pm)");

svg.append("text")
    .attr("x", xScale("Night"))
    .attr("y", 80)
    .attr("font-weight", "light")
    .text("Night (2pm-11pm)");


// x-axis label
svg.append("text")
    .attr("x", (xScale("Morning") + xScale("Night")) / 2)
    .attr("y", svgHeight - 39)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Time of the Day");

// y-axis label (rotated)
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -svgHeight / 2)
    .attr("y", 260)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Date");


// LEGEND POSITION
let legendX = 800;
let legendY = 90;


// LEGEND 1 (COLOR) 

// box for overload legend
svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", 110)
    .attr("height", 100)
    .attr("fill", "none")
    .attr("stroke", "#4c4b4b")
    .attr("stroke-width", 0.5);

// title
svg.append("text")
    .attr("x", legendX + 58)
    .attr("y", legendY - 3)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Overload");

// low
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

// medium
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

// high
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


// LEGEND 2 (ACTIVITY EXPLANATION) 

// title
svg.append("text")
    .attr("x", legendX + 105)
    .attr("y", legendY + 135)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Activity");

// box
svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY + 116)
    .attr("width", 235)
    .attr("height",75)
    .attr("fill", "none")
    .attr("stroke", "#4c4b4b")
    .attr("stroke-width", 0.5);

// explanation text
svg.append("text")
    .attr("x", legendX + 10)
    .attr("y", legendY + 160)
    .text("Stroke thickness = Notifications")
    .attr("font-size", "15px");

svg.append("text")
    .attr("x", legendX + 10)
    .attr("y", legendY + 180)
    .text("Rectangle width = App switching")
    .attr("font-size", "15px");


// LEGEND 3 (STROKE LEVELS)

// box
svg.append("rect")
    .attr("x", legendX)
    .attr("y", legendY + 210)  
    .attr("width", 210)
    .attr("height", 118)
    .attr("fill", "none")
    .attr("stroke", "#4c4b4b")
    .attr("stroke-width", 0.5);

// title
svg.append("text")
    .attr("x", legendX + 105)
    .attr("y", legendY + 228)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Notification Stroke");


// low
svg.append("rect")
    .attr("x", legendX + 10)
    .attr("y", legendY + 240)
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "#cd4040")
    .attr("stroke", "#000")
    .attr("stroke-width", 1);

svg.append("text")
    .attr("x", legendX + 50)
    .attr("y", legendY + 255)
    .text("Low notifications");

// medium
svg.append("rect")
    .attr("x", legendX + 10)
    .attr("y", legendY + 270)
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "#cd4040")
    .attr("stroke", "#000")
    .attr("stroke-width", 2);

svg.append("text")
    .attr("x", legendX + 50)
    .attr("y", legendY + 285)
    .text("Medium notifications");

// high
svg.append("rect")
    .attr("x", legendX + 10)
    .attr("y", legendY + 300)
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "#cd4040")
    .attr("stroke", "#000")
    .attr("stroke-width", 3);

svg.append("text")
    .attr("x", legendX + 50)
    .attr("y", legendY + 316)
    .text("High notifications");

}