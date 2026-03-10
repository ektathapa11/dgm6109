"use strict";

/* function bear 

Purpose: Draws a bear character to the given SVG drawing canvas.
The bear is drawn with respect to a center point of origin so that
the whole parts move together when the origin changes.

Parameters: 
drawing: The SVG drawing canvas (D3 selection) to draw on.
x: The x-axis (horizontal origin) value of the bear's position.
y: The y-axis (vertical origin) value of the bear's position.
showOrigin: Boolean value (true/false) that indicates the presence
of the origin point. 

Returns: The SVG drawing canvas with the bear added to it.*/

function bear(drawing, x, y, showOrigin) {
    // remove any existing bear drawings
    drawing.selectAll(".bear").remove();

    //Ears
    drawing.append("circle")
           .attr("class", "bear")
           .attr("cx", 40 + x)
           .attr("cy", 40 + y)
           .attr("r", 15)
           .attr("fill", "black");
    
    drawing.append("circle")
           .attr("class", "bear")
           .attr("cx", 110 + x)
           .attr("cy", 40 + y)
           .attr("r", 15)
           .attr("fill", "black");

    //Head
    drawing.append("circle")
           .attr("class", "bear")
           .attr("cx", 75 + x)
           .attr("cy", 75 + y)
           .attr("r", 50)
           .attr("fill", "#cbcbcb");
    
    //Eyes
    drawing.append("ellipse")
           .attr("class", "bear")
           .attr("cx", 55 + x)
           .attr("cy", 65 + y)
           .attr("rx", 10)
           .attr("ry", 15)
           .attr("fill", "white");

    drawing.append("ellipse")
           .attr("class", "bear")
           .attr("cx", 90 + x)
           .attr("cy", 65 + y)
           .attr("rx", 10)
           .attr("ry", 15)
           .attr("fill", "white");
    
    //Eyeballs
    drawing.append("circle")
           .attr("class", "bear")
           .attr("cx", 55 + x)
           .attr("cy", 70 + y)
           .attr("r", 5)
           .attr("fill", "black");
    
    drawing.append("circle")
           .attr("class", "bear")
           .attr("cx", 90 + x)
           .attr("cy", 70 + y)
           .attr("r", 5)
           .attr("fill", "black");
    
    //Mouth
    drawing.append("line")
    .attr("class", "bear")
    .attr("x1", 55 + x)
    .attr("y1", 100 + y)
    .attr("x2", 95 + x)
    .attr("y2", 100 + y)
    .attr("stroke", "black");

    //Nose
    drawing.append("polyline")
           .attr("class", "bear")
           .attr("points", closedPolygon(
                 70 + x, 80 + y,
                 75 + x, 80 + y,
                 65 + x, 85 + y,
                 80 + x, 85 + y))
            .attr("fill", "black");
    
    //Body
    drawing.append("ellipse")
           .attr("class", "bear")
           .attr("cx", 75 + x)
           .attr("cy", 175 + y)
           .attr("rx", 60)
           .attr("ry", 60)
           .attr("fill", "#cbcbcb");
    
    //Arms
    drawing.append("ellipse")
           .attr("class", "bear")
           .attr("cx", 50 + x)
           .attr("cy", 167.5 + y)
           .attr("rx", 40)
           .attr("ry", 47.5)
           .attr("fill", "black");

    drawing.append("ellipse")
           .attr("class", "bear")
           .attr("cx", 100 + x)
           .attr("cy", 167.5 + y)
           .attr("rx", 40)
           .attr("ry", 47.5)
           .attr("fill", "black");

    //Legs
    drawing.append("rect")
           .attr("class", "bear")
           .attr("x", 40 + x)
           .attr("y", 215 + y)
           .attr("width", 30)
           .attr("height", 60)       
           .attr("fill", "#cbcbcb");
    
    drawing.append("rect")
           .attr("class", "bear")
           .attr("x", 80 + x)
           .attr("y", 215 + y)
           .attr("width", 30)
           .attr("height", 60)       
           .attr("fill", "#cbcbcb");
    
    if (showOrigin) {
        drawing.append("circle")
               .attr("cx", x)
               .attr("cy", y)
               .attr("r", 3)
               .attr("fill", "deeppink")
    }
    return drawing;
    
}