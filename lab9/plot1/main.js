"use strict"

/**** Configuration variables ****/
let svgWidth = 850
let svgHeight = 600

let leftMargin = 80
let rightMargin = 25
let topMargin = 100
let bottomMargin = 60

/**** CANVAS SETUP ****/

d3.select("#container")
.style("width", String(svgWidth) + "px")

let svg = d3.select("#drawing")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight)

/* border */
svg.append("rect")
.attr("fill","none")
.attr("stroke","black")
.attr("width",svgWidth)
.attr("height",svgHeight)


/**** DATASET (YOUR DATA) ****/

let dataset = [

{date:"Feb 8", switches:110, screen:420, overload2:3, overload10:4},
{date:"Feb 9", switches:142, screen:510, overload2:4, overload10:5},
{date:"Feb 10", switches:156, screen:545, overload2:4, overload10:5},
{date:"Feb 11", switches:128, screen:470, overload2:3, overload10:5},
{date:"Feb 12", switches:135, screen:490, overload2:4, overload10:4},
{date:"Feb 13", switches:85, screen:210, overload2:2, overload10:3},
{date:"Feb 14", switches:60, screen:150, overload2:1, overload10:2},
{date:"Feb 15", switches:75, screen:185, overload2:2, overload10:3},
{date:"Feb 16", switches:95, screen:310, overload2:3, overload10:4},
{date:"Feb 17", switches:148, screen:525, overload2:4, overload10:5}

]

let highSwitchDays = dataset.filter(function(d){
    return d.switches > 120
})

/**** SORT DATA (screen time) ****/

dataset.sort(function(a,b){
if(a.screen <= b.screen){
return -1
}
return 1
})


/**** SCALE FUNCTIONS ****/

let xScale = d3.scaleLinear()
.domain([150,550])
.range([leftMargin, svgWidth-rightMargin])

let yScale = d3.scaleLinear()
.domain([1,5])
.range([svgHeight-bottomMargin, topMargin])


/**** DRAW DATA POINTS ****/

/* Squares (2pm overload) */

svg.selectAll("rect.square")
.data(dataset)
.join("rect")
.attr("class","square")
.attr("x",d=>xScale(d.screen)-6)
.attr("y",d=>yScale(d.overload2)-6)
.attr("width",12)
.attr("height",12)
.attr("fill",function(d){
    if(highSwitchDays.includes(d)){
        return "red"
    }else{
        return "orange"
    }
})


/* Triangles (10pm overload) */

svg.selectAll("path.triangle")
.data(dataset)
.join("path")
.attr("class","triangle")
.attr("transform",d=>`translate(${xScale(d.screen)+8},${yScale(d.overload10)})`)
.attr("d",d3.symbol().type(d3.symbolTriangle).size(120))
.attr("fill",function(d){
    if(highSwitchDays.includes(d)){
        return "red"
    }else{
        return "orange"
    }
})


/**** AXIS LINES ****/

svg.append("line")
.attr("x1",xScale(150))
.attr("y1",yScale(1))
.attr("x2",xScale(550))
.attr("y2",yScale(1))
.attr("stroke","black")

svg.append("line")
.attr("x1",xScale(150))
.attr("y1",yScale(1))
.attr("x2",xScale(150))
.attr("y2",yScale(5))
.attr("stroke","black")


/**** X AXIS VALUES ****/

for(let i=150;i<=550;i+=50){

svg.append("text")
.classed("axis",true)
.attr("x",xScale(i))
.attr("y",svgHeight-bottomMargin)
.style("text-anchor","middle")
.style("alignment-baseline","before-edge")
.text(i)

}


/**** Y AXIS VALUES ****/

for(let i=1;i<=5;i++){

svg.append("text")
.classed("axis",true)
.attr("x",leftMargin-5)
.attr("y",yScale(i))
.style("text-anchor","end")
.style("alignment-baseline","middle")
.text(i)

}


/**** AXIS LABELS ****/

svg.append("text")
.attr("class","axisLabel")
.attr("x",svgWidth/2)
.attr("y",svgHeight-bottomMargin/4)
.style("text-anchor","middle")
.text("Screen Time (minutes)")


svg.append("text")
.attr("class","axisLabel")
.attr("transform","rotate(-90)")
.attr("x",-svgHeight/2)
.attr("y",leftMargin/4)
.style("text-anchor","middle")
.text("Mental Overload")


/**** LEGEND ****/

let legend = svg.append("g")
.attr("transform","translate(580,60)")

legend.append("rect")
.attr("width",170)
.attr("height",90)
.attr("fill","none")
.attr("stroke","black")

legend.append("rect")
.attr("x",10)
.attr("y",12)
.attr("width",10)
.attr("height",10)
.attr("fill","orange")

legend.append("text")
.attr("x",28)
.attr("y",20)
.text("Overload at 2pm")

legend.append("path")
.attr("transform","translate(15,40)")
.attr("d",d3.symbol().type(d3.symbolTriangle).size(100))
.attr("fill","red")

legend.append("text")
.attr("x",28)
.attr("y",45)
.text("Overload at 10pm")

legend.append("text")
.attr("x",10)
.attr("y",70)
.text("Color = App Switches")