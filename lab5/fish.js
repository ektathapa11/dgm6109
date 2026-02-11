"use strict"

/* ************ function drawFish () *****
PURPOSE:
Gets the data from the form and draws a fish depending on the input of the user. The fish can be either blue and calm
or red and angry with a bat depending of what the user selects. It can also show the origin point of the drawing if the user wants it to.


PARAMETERS:
svgArea: the SVG drawing area
fishX: the horizontal position of the drawing
fishY: the vertical position of the drawing
originVisible: a value that determines if the origin point of the drawing will be visible

RETURNS:
The SVG drawing area
****************************************************************** */


function drawFish(svgArea, fishX, fishY, originVisible) {


    /*I'm taking the fishBodyBase1 coordinates as the point of reference*/

    /* The order of the coordinates of the polygons are ALWAYS from the top to the bottom,
    and if two points coincide on the y axis, the first point coded will be the 
    one on the left*/

    //Code for the tail

    let fishTail = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX - 100, fishY - 50, // Original 15, 75
            fishX - 50, fishY, //Original 75, 125
            fishX - 100, fishY + 50 //Original 15, 175
        ))
        .attr("fill", "#F5B427");

    //Code for the fish's fins (the orange triangles that are at the top and at the bottom of the fish's body)

    let fishTopFin = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX - 40, fishY - 95,//Orignal 85, 30
            fishX - 5, fishY - 50, //Original 120, 75
            fishX + 50, fishY - 50 //Original 175, 75
        ))
        .attr("fill", "#F5B427");

    let fishBottomFin = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX - 5, fishY + 50, //Original 120, 175
            fishX + 50, fishY + 50, //Original 175, 175
            fishX - 10, fishY + 75 //Original 115, 200
        ))
        .attr("fill", "#F5B427");

    //Code for the fish's body base (the light blue part)

    let fishBodyBase1 = svgArea.append("circle")
        .attr("cx", fishX)//125
        .attr("cy", fishY)//125
        .attr("r", 50)
        .attr("fill", "#577AEB");

    let fishBodyBase2 = svgArea.append("rect")
        .attr("x", fishX)//Original 125
        .attr("y", fishY - 50)//Original 75
        .attr("width", 50)
        .attr("height", 100)
        .attr("fill", "#577AEB");

    //Code for the fish's body details (the triangles of various colors)

     let fishBodyTopDetail = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX + 50, fishY - 50,//Original 175, 75
            fishX, fishY - 25,//Original 125, 100
            fishX + 50, fishY//Original 175, 125
        ))
        .attr("fill", "yellow");

    let fishBodyMidDetailLeft = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
            fishX - 50, fishY, //Original 75, 125
            fishX, fishY + 25 //Original 125, 150
        ))
        .attr("fill", "#1D44D1");

    let fishBodyMidDetailRight = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX, fishY - 25,//Original 125, 100
            fishX + 50, fishY,//Original 175, 125
            fishX, fishY + 25 //Original 125, 150
        ))
        .attr("fill", "#1D44D1");

    let fishBodyBottomDetail = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX + 50, fishY,//Original 175, 125
            fishX, fishY + 25,//Original 125, 150
            fishX + 50, fishY + 50//Original 175, 175
        ))
        .attr("fill", "yellow");

    //Code for the fish's head base (light blue part)

    let fishHeadBase = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX + 50, fishY - 50, //Original 175, 75
            fishX + 150, fishY, //Original 275, 125
            fishX + 50, fishY + 50 //Original 175, 175
        ))
        .attr("fill", "#577AEB");

    //Code for the fish's head detail

    let fishHeadDetail = svgArea.append("polygon")
        .attr("points", closedPolygon(fishX + 100, fishY - 25, //Original 225, 100
            fishX + 50, fishY, //Original 175, 125
            fishX + 100, fishY + 25  //Original 225, 150
        ))
        .attr("fill", "#1D44D1");

    let fishEye = svgArea.append("circle")
        .attr("cx", fishX + 115) //Original 240
        .attr("cy", fishY - 5)//Original 120
        .attr("r", 5)
        .attr("fill", "black");

    if (originVisible == true) {

        let originPoint = svgArea.append("circle")
            .attr("cx", fishX)//125
            .attr("cy", fishY)//125
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return svgArea;

}