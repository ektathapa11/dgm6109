"use strict"

let drawHeight = 500;
let drawWidth = 500;

//  Variable that enables to talk SVG drawing canvas
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", drawWidth)
    .attr("height", drawHeight);

// This draws a border around the canvas so the edges can be seen 
let border = drawing.append("rect")
    .attr("width", drawWidth)
    .attr("height", drawHeight)
    .attr("fill", "lightblue")
    .attr("stroke", "red");

  // These variables allow the entire dog to move together
 //  All coordinates below are calculated relative to these

let dogX = 100; 
let dogY = 75;

// Using polygons for the triangular tail and back leg

let dogTail = drawing.append("polygon")
    .attr("points", dogX + "," + (dogY + 225) + " " + dogX + "," + (dogY + 300) + " " + (dogX + 50) + "," + (dogY + 300))
    .attr("fill", "#999999")
    .attr("stroke", "black");


let backLeg = drawing.append("polygon")
    .attr("points", (dogX + 50) + "," + (dogY + 300) + " " + (dogX + 100) + "," + (dogY + 175) + " " + (dogX + 125) + "," + (dogY + 300))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

// FRONT BODY AND LEGS
   //Main triangular chest and front legs

let frontBody = drawing.append("polygon")
    .attr("points", (dogX + 100) + "," + (dogY + 175) + " " + (dogX + 125) + "," + (dogY + 300) + " " + (dogX + 175) + "," + (dogY + 300))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

let neckSupport = drawing.append("polygon")
    .attr("points", (dogX + 75) + "," + (dogY + 125) + " " + (dogX + 125) + "," + (dogY + 125) + " " + (dogX + 100) + "," + (dogY + 175))
    .attr("fill", "#999999")
    .attr("stroke", "black");

// HEAD AND EARS
   // The primary head polygon and the two distinct triangular ears

let headMain = drawing.append("polygon")
    .attr("points", (dogX + 25) + "," + (dogY + 75) + " " + (dogX + 150) + "," + (dogY + 200) + " " + (dogX + 125) + "," + (dogY + 50))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

let earLeft = drawing.append("polygon")
    .attr("points", (dogX + 25) + "," + (dogY + 75) + " " + dogX + "," + (dogY + 175) + " " + (dogX + 50) + "," + (dogY + 175))
    .attr("fill", "#999999")
    .attr("stroke", "black");

let earRight = drawing.append("polygon")
    .attr("points", (dogX + 125) + "," + (dogY + 50) + " " + (dogX + 200) + "," + dogY + " " + (dogX + 200) + "," + (dogY + 75))
    .attr("fill", "#CCCCCC")
    .attr("stroke", "black");

// FACE DETAILS
  // Eyes and the nose circle at the tip of the snout

let eyeLeft = drawing.append("circle")
    .attr("cx", dogX + 75)
    .attr("cy", dogY + 85)
    .attr("r", 5)
    .attr("fill", "black");

let eyeRight = drawing.append("circle")
    .attr("cx", dogX + 105)
    .attr("cy", dogY + 75)
    .attr("r", 5)
    .attr("fill", "black");

let noseTip = drawing.append("circle")
    .attr("cx", dogX + 150)
    .attr("cy", dogY + 200)
    .attr("r", 6)
    .attr("fill", "black")
    .attr("stroke", "black");

    // LEG DETAIL LINES (Fingers/Claws)
  // Placed at the bottom of the front leg polygons

// First leg lines
let legLine1 = drawing.append("line")
    .attr("x1", dogX + 110)
    .attr("y1", dogY + 290)
    .attr("x2", dogX + 110)
    .attr("y2", dogY + 300)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

let legLine2 = drawing.append("line")
    .attr("x1", dogX + 118)
    .attr("y1", dogY + 290)
    .attr("x2", dogX + 118)
    .attr("y2", dogY + 300)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

// Second leg lines
let legLine3 = drawing.append("line")
    .attr("x1", dogX + 155)
    .attr("y1", dogY + 290)
    .attr("x2", dogX + 155)
    .attr("y2", dogY + 300)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

let legLine4 = drawing.append("line")
    .attr("x1", dogX + 163)
    .attr("y1", dogY + 290)
    .attr("x2", dogX + 163)
    .attr("y2", dogY + 300)
    .attr("stroke", "black")
    .attr("stroke-width", 1);