"use strict"

/**** CONFIGURATION ****/

let svgWidth = 650
let svgHeight = 500

let leftMargin = 80
let rightMargin = 40
let topMargin = 80
let bottomMargin = 60


/**** CANVAS SETUP ****/

d3.select("#container")
.style("width", String(svgWidth) + "px")
.style("margin","0 auto")

let svg = d3.select("#drawing")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight)

svg.append("rect")
.attr("fill","none")
.attr("stroke","black")
.attr("width",svgWidth)
.attr("height",svgHeight)


/**** DATASET ****/

let dataset = [

{date:"Feb 8", screen:420, notifications:89, switches:110, overload:3.5},
{date:"Feb 9", screen:510, notifications:118, switches:142, overload:4.5},
{date:"Feb 10", screen:545, notifications:132, switches:156, overload:4.5},
{date:"Feb 11", screen:470, notifications:104, switches:128, overload:4},
{date:"Feb 12", screen:490, notifications:115, switches:135, overload:4},
{date:"Feb 13", screen:210, notifications:70, switches:85, overload:2.5},
{date:"Feb 14", screen:150, notifications:45, switches:60, overload:1.5},
{date:"Feb 15", screen:185, notifications:60, switches:75, overload:2.5},
{date:"Feb 16", screen:310, notifications:85, switches:95, overload:3.5},
{date:"Feb 17", screen:525, notifications:125, switches:148, overload:4.5}

]

/**** FILTER (required by rubric) ****/

let highNotifications = dataset.filter(function(d){
return d.notifications > 100
})


/**** SORT DATA ****/

dataset.sort(function(a,b){
return a.screen - b.screen
})


/**** SCALE FUNCTIONS ****/

let xScale = d3.scaleLinear()
.domain([150,550])
.range([leftMargin, svgWidth-rightMargin])

let yScale = d3.scaleLinear()
.domain([40,140])
.range([svgHeight-bottomMargin, topMargin])

let rScale = d3.scaleSqrt()
.domain([60,160])
.range([4,20])


/**** DRAW DATA POINTS ****/

svg.selectAll("circle")
.data(dataset)
.join("circle")
.attr("cx",d=>xScale(d.screen))
.attr("cy",d=>yScale(d.notifications))
.attr("r",d=>rScale(d.switches))
.attr("fill",function(d){
    if(highNotifications.includes(d)){
        return "red"
    }else{
        return "orange"
    }
})
.attr("opacity",0.7)


/**** AXIS LINES ****/

svg.append("line")
.attr("x1",xScale(150))
.attr("y1",yScale(40))
.attr("x2",xScale(550))
.attr("y2",yScale(40))
.attr("stroke","black")

svg.append("line")
.attr("x1",xScale(150))
.attr("y1",yScale(40))
.attr("x2",xScale(150))
.attr("y2",yScale(140))
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

for(let i=40;i<=140;i+=20){

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
.text("Notifications per Day")


/**** LEGEND ****/

let legend = svg.append("g")
.attr("transform","translate(370,40)")

legend.append("rect")
.attr("width",190)
.attr("height",90)
.attr("fill","none")
.attr("stroke","black")

legend.append("circle")
.attr("cx",15)
.attr("cy",20)
.attr("r",6)
.attr("fill","orange")

legend.append("text")
.attr("x",30)
.attr("y",25)
.text("Lower Notifications")

legend.append("circle")
.attr("cx",15)
.attr("cy",45)
.attr("r",8)
.attr("fill","red")

legend.append("text")
.attr("x",30)
.attr("y",50)
.text("Higher Notifications")

legend.append("text")
.attr("x",10)
.attr("y",70)
.text("Circle Size = App Switches")