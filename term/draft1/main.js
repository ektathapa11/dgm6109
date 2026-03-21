"use strict";

/* SVG SETUP*/

let svgWidth = 900;
let svgHeight = 500;

let svg = d3.select("#chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


d3.json("data.json").then(function (data) {
    console.log(data);
    buildVisualization(data);
});

svg.append("rect")
    .attr("x", 50)
    .attr("y", 50)
    .attr("width", svgWidth - 110)
    .attr("height", svgHeight - 100)
    .attr("fill", "none")
    .attr("stroke", "#333")
    .attr("stroke-width", );

/*GLOBAL VARIABLES*/

let xScale;


/*LOAD DATA*/

d3.json("data.json").then(function (data) {
    buildVisualization(data);
});


/*MAIN FUNCTION*/

function buildVisualization(data) {
    let renderData = organizeData(data);
    buildScales(renderData);
    drawVisualization(renderData);
}


/* ORGANIZE DATA*/

function organizeData(data) {
    return data;
}


/*BUILD SCALES*/

function buildScales(data) {

    // Using scalePoint for categorical data (Morning, Night)
    xScale = d3.scalePoint()
        .domain(["Morning", "Night"])
        .range([250, 450]);
}


/* COLOR FUNCTION (Mental Overload)*/

function getColor(overload) {

    if (overload <= 2) {
        return "#ff7c7c"; // light red (low overload)
    }
    if (overload <= 4) {
        return "#cd4040"; // medium red
    }
    return "#720303"; // dark red (high overload)
}

/* WIDTH FUNCTION (App Switches)*/

function getWidth(switches) {
    return switches * 0.6;
}


/* STROKE FUNCTION (Notifications)*/

function getStroke(notifications) {

    if (notifications < 70) {
        return 1;
    }
    if (notifications < 110) {
        return 2;
    }
    return 3;
}


/* DRAW VISUALIZATION*/

function drawVisualization(data) {
    let startY = 100;
    let rowHeight = 20;

    // LOOP through each day
    for (let i = 0; i < data.length; i++) {
        let value = data[i];
        let y = startY + i * rowHeight;  // Y position for each row (day)

        /* DATE LABEL (LEFT SIDE)*/

        svg.append("text")
            .attr("x", 100)
            .attr("y", y + 15)
            .text(value.day)
            .attr("font-size", "12px");


        /*Morning RECTANGLE*/

        svg.append("rect")
            .attr("x", xScale("Morning"))
            .attr("y", y)
            .attr("width", getWidth(value.appSwitches))
            .attr("height", 10)
            .attr("fill", getColor(value.overload2pm))
            .attr("stroke-width", getStroke(value.notifications));


        /*Night RECTANGLE*/

        svg.append("rect")
            .attr("x", xScale("Night"))
            .attr("y", y)
            .attr("width", getWidth(value.appSwitches))
            .attr("height", 10)
            .attr("fill", getColor(value.overload10pm))
            .attr("stroke-width", getStroke(value.notifications));
    }


    /*COLUMN LABELS*/

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
    .attr("fill", "#222")
    .text("Date");


    /* TITLE*/

    svg.append("text")
    .attr("x", svgWidth / 2.5)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("fill", "#222")
    .attr("font-weight", "bold")
    .text("TIME OF THE DAY");


    /*COLOR LEGEND*/

    svg.append("text")
        .attr("x", 600)
        .attr("y", 80)
        .text("Low Overload");

    svg.append("rect")
        .attr("x", 570)
        .attr("y", 70)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#ff7c7c");


    svg.append("text")
        .attr("x", 600)
        .attr("y", 110)
        .text("Medium Overload");

    svg.append("rect")
        .attr("x", 570)
        .attr("y", 100)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#cd4040");


    svg.append("text")
        .attr("x", 600)
        .attr("y", 140)
        .text("High Overload");

    svg.append("rect")
        .attr("x", 570)
        .attr("y", 130)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#720303");

svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", 467) 
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .attr("fill", "#333")
    .text("Rectangle width represents app switching frequency");
   

}