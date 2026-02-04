"use strict"

let drawHeight = 500;
let drawWidth = 500;

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", drawWidth)
    .attr("height", drawHeight);

// Background and Border
let border = drawing.append("rect")
    .attr("width", drawWidth)
    .attr("height", drawHeight)
    .attr("fill", "#ADD8E6") 
    .attr("stroke", "red");

// CONFIGURATION VARIABLES
 //  Change these to move the entire dog

let dogX = 200; 
let dogY = 200;


// What I tried: I tried to make the dog move using dogX and dogY
// What went wrong: The dog "fell apart" because some points were hardcoded while others used variables, causing the shapes to stretch
// How I fixed it: I recalculated every point in the closedPolygon functions to ensure they all use (dogX + offset) and (dogY + offset)
// Debugging methods: I used the Chrome Inspector to see which points were staying still while others moved. I also took some help from the AI

// DOG BODY SECTIONS
let dogTail = drawing.append("polygon")
    .attr("points", closedPolygon(dogX - 50, dogY + 125, dogX - 50, dogY + 200, dogX, dogY + 200))
    .attr("fill", "#999999")
    .attr("stroke", "black");

let bodyBack = drawing.append("polygon")
    .attr("points", closedPolygon(dogX, dogY + 200, dogX + 50, dogY + 75, dogX + 75, dogY + 200))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

let bodyFront = drawing.append("polygon")
    .attr("points", closedPolygon(dogX + 50, dogY + 75, dogX + 75, dogY + 200, dogX + 125, dogY + 200))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

// DOG HEAD AND EARS
let headMain = drawing.append("polygon")
    .attr("points", closedPolygon(dogX - 25, dogY - 25, dogX + 100, dogY + 100, dogX + 75, dogY - 50))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

let leftEar = drawing.append("polygon")
    .attr("points", closedPolygon(dogX - 25, dogY - 25, dogX - 50, dogY + 75, dogX, dogY + 75))
    .attr("fill", "#999999")
    .attr("stroke", "black");

let rightEar = drawing.append("polygon")
    .attr("points", closedPolygon(dogX + 75, dogY - 50, dogX + 150, dogY - 100, dogX + 150, dogY - 75))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

// FACE DETAILS
let leftEye = drawing.append("circle")
    .attr("cx", dogX + 25)
    .attr("cy", dogY - 15)
    .attr("r", 4)
    .attr("fill", "black");

let rightEye = drawing.append("circle")    
    .attr("cx", dogX + 55)
    .attr("cy", dogY - 25)
    .attr("r", 4)
    .attr("fill", "black");

let noseTip = drawing.append("circle")
    .attr("cx", dogX + 100)
    .attr("cy", dogY + 100)
    .attr("r", 5)
    .attr("fill", "black")
    .attr("stroke", "black");

// PAW LINES
let pawLine1 = drawing.append("line")
    .attr("x1", dogX + 65)
    .attr("y1", dogY + 190)
    .attr("x2", dogX + 65)
    .attr("y2", dogY + 200)
    .attr("stroke", "black");

let pawLine2 = drawing.append("line")
    .attr("x1", dogX + 110)
    .attr("y1", dogY + 190)
    .attr("x2", dogX + 110)
    .attr("y2", dogY + 200)
    .attr("stroke", "black");

    