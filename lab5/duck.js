"use strict"

/* ******* function duck() *************
PURPOSE:
read the user input, create a drawing canvas and draw a duck according
to user's selections with either eyes open or closed

PARAMETERS:
svgArea:      an SVG group or canvas wrapped by d3
duckX:        selected option from first select menu - horizontal position for the origin point (numberical value)
duckY:        selected option from second select menu - vertical position for the origin point (numberical value)
duckOriginpoint:   a boolean value that corresponds to user's choice to show or not show the origin point, 
                   where 1 is (true) for showing the origin point and 2 is (false) for not showing origin point

RETURNS:
svgArea

************************************** */


function drawDuck(svgArea, duckX, duckY, booleanValue) {


    /* Elements of the duck that are consctructed with the line function. 
    The only current variable that has properties synced with duckX and duckY. */
    let duckLefthairstrand = svgArea.append("line") /// left hairstrand
        .attr("x1", duckX + 100) /// original x1 = 200
        .attr("y1", duckY - 39.5) /// original y1 = 10.5
        .attr("x2", duckX + 115) /// original x2 = 215
        .attr("y2", duckY - 25) /// original y2 = 25
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    let duckMiddlehairstrand = svgArea.append("line") /// middle hairstrand
        .attr("x1", duckX + 105) /// original x1 = 205
        .attr("y1", duckY - 42.5) /// original y1 = 7.5
        .attr("x2", duckX + 115) /// original x2 = 215
        .attr("y2", duckY - 25) /// original y2 = 25
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    let duckRighthairstrand = svgArea.append("line") /// right hairstrand
        .attr("x1", duckX + 110) /// original x1 = 210
        .attr("y1", duckY - 45) /// original y1 = 5
        .attr("x2", duckX + 115) /// original x1 = 215
        .attr("y2", duckY - 25) /// original y2 = 25
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Elements of the duck that are conscructed with polylines like head and boduckY*/
    let duckBoduckY = svgArea.append("polyline") /// duck's boduckY
        .attr("points", closedPolygon(duckX - 25, duckY + 75, duckX, duckY + 50, duckX + 80, duckY + 50, duckX + 132.5, duckY + 80, duckX + 152.5, duckY + 135, duckX + 10, duckY + 135)) /// 75, 125, 110, 100, 180, 100, 232.5, 130, 252.5, 185, 110, 185
        .attr("fill", "#FEFFBE");

    let duckHead = svgArea.append("polyline") /// duck's head
        .attr("points", closedPolygon(duckX + 80, duckY + 50, duckX + 100, duckY, duckX + 115, duckY - 25, duckX + 150, duckY + 10, duckX + 150, duckY + 65, duckX + 132.5, duckY + 64.5, duckX + 132.5, duckY + 80)) /// 180, 100, 200, 50, 215, 25, 250, 60, 250, 115, 232.5, 114.5, 232.5, 130
        .attr("fill", "#FEFFBE");

    /* The water which is made of one single rectangle */
    let duckWater = svgArea.append("rect") /// water
        .attr("x", duckX - 75) /// x1 = 25
        .attr("y", duckY + 130.5) /// y1 = 182.5
        .attr("width", 250)
        .attr("height", 17.5)
        .attr("fill", "#4DBBFF");

    /* Elements of the duck that are conscructed with triangles */
    let duckTail = svgArea.append("polyline") /// duck's tail
        .attr("points", closedPolygon(duckX - 45, duckY - 5, duckX - 25, duckY + 75, duckX + 10, duckY + 50)) /// 55, 45, 75, 125, 110, 100
        .attr("fill", "#FEFFBE"); /// change colour to the correct one later

    let duckWing = svgArea.append("polyline") /// duck's wing
        .attr("points", closedPolygon(duckX - 10, duckY + 100, duckX + 75, duckY + 50, duckX + 80, duckY + 140)) /// 90, 150, 175, 100, 180, 190
        .attr("fill", "#9E7445");

    let duckBeak = svgArea.append("polyline") /// duck's beak
        .attr("points", closedPolygon(duckX + 150, duckY + 10, duckX + 200, duckY + 60, duckX + 150, duckY + 65)) /// 250, 60, 300, 110, 250, 115
        .attr("fill", "#FF914D");

    /* Duck's eye */
    
    let duckEye = svgArea.append("circle")
        .attr("cx", duckX + 130) /// x1 = 230
        .attr("cy", duckY + 17.5) /// y1 = 67.5
        .attr("r", 5)
        .attr("fill", "black");

    
    
    if ( booleanValue === true ) {
        let booleanValue = svgArea.append("circle")
            .attr("cx", duckX) 
            .attr("cy", duckY) 
            .attr("r", 3)
            .attr("fill", "deeppink");
    }
   

    return svgArea;


    /// origin point for my svgArea duckX = 100 and duckY = 50. As I didn't have simple shapes at the base of my figure I arbitrarily selected two values that were more or less at the centre of the svgArea.




    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
