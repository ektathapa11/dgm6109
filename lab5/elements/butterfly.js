"use strict"

/****** function drawButterfly(svgPostion, butterflyX, butterflyY, showOrigin) *******
PURPOSE: 
    Draw a butterfly on your canvas; it can change from having 4 wings to having 6 wings.
PARAMETERS:
    svgPostion: The canva selection object where the butterfly will be appended.
    butterflyX: The base X-coordinate for the butterfly's position.
    butterflyY: The base Y-coordinate for the butterfly's position.
    showOrigin: If true, draws a deeppink cirle on the OG point of butterfly.
Returns:
  The updated D3 selection object (svgPosition)
************************************************/
function drawButterfly(svgPosition,butterflyX,butterflyY,showOrigin) {

//butterflyX = 110 butterflyY = 60 butterfly OG location

let butterflyBody = svgPosition.append("rect") // It is Butterfly body
    .attr("x" , butterflyX)
    .attr("y" , butterflyY)
    .attr("width" , 10)
    .attr("height" , 150)
    .attr("fill", "green")

let butterflyLeftTopWing = svgPosition.append("polyline") // It is Butterfly left top wing
    .attr("points", closedPolygon(
        butterflyX - 30 , butterflyY - 40 , 
        butterflyX , butterflyY + 50 , 
        butterflyX - 90 , butterflyY + 30))
    .attr("fill", "yellow")

let butterflyRightTopWing = svgPosition.append("polyline") // It is Butterfly right top wing
    .attr("points", closedPolygon(
        butterflyX + 40 , butterflyY - 40 , 
        butterflyX + 10 , butterflyY + 50 , 
        butterflyX + 100 , butterflyY + 30))
    .attr("fill", "yellow")

let butterflyRightLowerWing = svgPosition.append("polyline") // It is Butterfly right bottom wing
    .attr("points", closedPolygon(
        butterflyX + 80 , butterflyY + 50 , 
        butterflyX + 10 , butterflyY + 50 , 
        butterflyX + 10 , butterflyY + 180))
    .attr("fill", "orange") 

let butterflyLeftLowerWing = svgPosition.append("polyline") // It is Butterfly left bottom wing
    .attr("points", closedPolygon(
        butterflyX - 70 , butterflyY + 50 , 
        butterflyX , butterflyY + 50 , 
        butterflyX , butterflyY + 180))
    .attr("fill", "orange")

let butterflyLeftEye = svgPosition.append("circle") // It is Butterfly left eeeeye
    .attr("cx", butterflyX - 5)
    .attr("cy", butterflyY)
    .attr("r", 10)
    .attr("fill", "red")

let butterflyRightEye = svgPosition.append("circle") // It is Butterfly right eyeeee
    .attr("cx", butterflyX + 15)
    .attr("cy", butterflyY)
    .attr("r", 10)
    .attr("fill", "red")

let butterflyLeftTentacle = svgPosition.append("line") // It is Butterfly left tentacle
    .attr("x1", butterflyX)
    .attr("y1", butterflyY - 8)
    .attr("x2", butterflyX - 20)
    .attr("y2", butterflyY - 50)
    .attr("stroke", "black")
    .attr("stroke-width" , 2)

let butterflyRightTentacle = svgPosition.append("line") // It is Butterfly right tentacle
    .attr("x1", butterflyX + 10)
    .attr("y1", butterflyY - 8)
    .attr("x2", butterflyX + 30)
    .attr("y2", butterflyY - 50)
    .attr("stroke", "black")
    .attr("stroke-width" , 2)

let butterflyLeftThirdWing = svgPosition.append("polyline")
    .attr("points", closedPolygon(
      butterflyX , butterflyY + 60,
      butterflyX - 40, butterflyY + 70,
      butterflyX - 40, butterflyY + 200
    ))
    .attr("fill", "pink")

let butterflyRightThirdWing = svgPosition.append("polyline")
    .attr("points", closedPolygon(
      butterflyX + 10 , butterflyY + 60,
      butterflyX + 50, butterflyY + 70,
      butterflyX + 40, butterflyY + 200
    ))
    .attr("fill", "pink")


    // if (choice === "2") {
    // let butterflyLeftThirdWing = svgPosition.append("polyline")
    // .attr("points", closedPolygon(
    //   butterflyX , butterflyY + 60,
    //   butterflyX - 40, butterflyY + 70,
    //   butterflyX - 40, butterflyY + 200
    // ))
    // .attr("fill", "pink")

    // let butterflyRightThirdWing = svgPosition.append("polyline")
    // .attr("points", closedPolygon(
    //   butterflyX + 10 , butterflyY + 60,
    //   butterflyX + 50, butterflyY + 70,
    //   butterflyX + 40, butterflyY + 200
    // ))
    // .attr("fill", "pink")
    // }// if user wanna 6 wings, will add 2 more wings

if (showOrigin == true) {
    svgPosition.append("circle")
            .attr("cx", butterflyX)
            .attr("cy", butterflyY)
            .attr("r", 3)
            .attr("fill", "black");
}
return svgPosition;
    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}

/** AI-generated explanation of the funtion closed-polygon () 
 * I added this funtion to prevent image display bugs in the browser.
 * Generates a coordinate string for a closed triangular polygon.
 * @param {number} x1 - X-coordinate of the first point.
 * @param {number} y1 - Y-coordinate of the first point.
 * @param {number} x2 - X-coordinate of the second point.
 * @param {number} y2 - Y-coordinate of the second point.
 * @param {number} x3 - X-coordinate of the third point.
 * @param {number} y3 - Y-coordinate of the third point.
 * @returns {string} - A formatted string of points (e.g., "x1,y1 x2,y2 x3,y3 x1,y1").
 */
function closedPolygon(x1, y1, x2, y2, x3, y3) {
  return x1 + "," + y1 + " " +
         x2 + "," + y2 + " " +
         x3 + "," + y3 + " " +
         x1 + "," + y1; // closed polygon
}