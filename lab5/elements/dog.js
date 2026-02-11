"use strict";

/*
function dog

Purpose:
Draws a dog character on the given SVG canvas. All parts of the dog
are drawn relative to an origin point so the drawing moves together.

Parameters:
canvas: The SVG drawing area.
x: Horizontal origin position of the dog.
y: Vertical origin position of the dog.
showOrigin: Boolean value that shows or hides the origin point.

Returns:
The SVG drawing canvas with the dog added.
*/

function dog(canvas, x, y, showOrigin) {

    let dogX = x;
    let dogY = y;

    // TAIL
    canvas.append("polygon")
        .attr("points", dogX + "," + (dogY + 225) + " " +
                        dogX + "," + (dogY + 300) + " " +
                        (dogX + 50) + "," + (dogY + 300))
        .attr("fill", "#999999")
        .attr("stroke", "black");

    // BACK LEG
    canvas.append("polygon")
        .attr("points", (dogX + 50) + "," + (dogY + 300) + " " +
                        (dogX + 100) + "," + (dogY + 175) + " " +
                        (dogX + 125) + "," + (dogY + 300))
        .attr("fill", "#CCCCCC")
        .attr("stroke", "black");

    // FRONT BODY
    canvas.append("polygon")
        .attr("points", (dogX + 100) + "," + (dogY + 175) + " " +
                        (dogX + 125) + "," + (dogY + 300) + " " +
                        (dogX + 175) + "," + (dogY + 300))
        .attr("fill", "#CCCCCC")
        .attr("stroke", "black");

    // NECK
    canvas.append("polygon")
        .attr("points", (dogX + 75) + "," + (dogY + 125) + " " +
                        (dogX + 125) + "," + (dogY + 125) + " " +
                        (dogX + 100) + "," + (dogY + 175))
        .attr("fill", "#999999")
        .attr("stroke", "black");

    // HEAD
    canvas.append("polygon")
        .attr("points", (dogX + 25) + "," + (dogY + 75) + " " +
                        (dogX + 150) + "," + (dogY + 200) + " " +
                        (dogX + 125) + "," + (dogY + 50))
        .attr("fill", "#CCCCCC")
        .attr("stroke", "black");

    // EARS
    canvas.append("polygon")
        .attr("points", (dogX + 25) + "," + (dogY + 75) + " " +
                        dogX + "," + (dogY + 175) + " " +
                        (dogX + 50) + "," + (dogY + 175))
        .attr("fill", "#999999")
        .attr("stroke", "black");

    canvas.append("polygon")
        .attr("points", (dogX + 125) + "," + (dogY + 50) + " " +
                        (dogX + 200) + "," + dogY + " " +
                        (dogX + 200) + "," + (dogY + 75))
        .attr("fill", "#CCCCCC")
        .attr("stroke", "black");

    // EYES
    canvas.append("circle")
        .attr("cx", dogX + 75)
        .attr("cy", dogY + 85)
        .attr("r", 5)
        .attr("fill", "black");

    canvas.append("circle")
        .attr("cx", dogX + 105)
        .attr("cy", dogY + 75)
        .attr("r", 5)
        .attr("fill", "black");

    // NOSE
    canvas.append("circle")
        .attr("cx", dogX + 150)
        .attr("cy", dogY + 200)
        .attr("r", 6)
        .attr("fill", "black");

    // LEG LINES
    canvas.append("line")
        .attr("x1", dogX + 110)
        .attr("y1", dogY + 290)
        .attr("x2", dogX + 110)
        .attr("y2", dogY + 300)
        .attr("stroke", "black");

    canvas.append("line")
        .attr("x1", dogX + 118)
        .attr("y1", dogY + 290)
        .attr("x2", dogX + 118)
        .attr("y2", dogY + 300)
        .attr("stroke", "black");

    canvas.append("line")
        .attr("x1", dogX + 155)
        .attr("y1", dogY + 290)
        .attr("x2", dogX + 155)
        .attr("y2", dogY + 300)
        .attr("stroke", "black");

    canvas.append("line")
        .attr("x1", dogX + 163)
        .attr("y1", dogY + 290)
        .attr("x2", dogX + 163)
        .attr("y2", dogY + 300)
        .attr("stroke", "black");

    // ORIGIN POINT
    if (showOrigin) {
        canvas.append("circle")
            .attr("cx", dogX)
            .attr("cy", dogY)
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return canvas;
}
