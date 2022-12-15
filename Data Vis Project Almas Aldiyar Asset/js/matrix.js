function Matrix(co2Data, gdpData, pmData, year, country, matrixId){

d3.select(matrixId).html("");

let filterCo2 = co2Data.filter(function(d){ return d.Country_Code==country;})
let filtergdp = gdpData.filter(function(d){ return d.Country_Code==country;})
let filterpm = pmData.filter(function(d){ return d.Country_Code==country;})

if(filterCo2.length>0 || filtergdp.length>0 || filterpm.length>0){

    let correlation = function (x,y){
        if(x && y){
            x = Number(x);
            y = Number(y);
            let sxy = x*y;
            let sxx = x*x;
            let syy = y*y;
            let pr = sxx*syy;
            let r = ((sxy)/(Math.sqrt(pr)));
            return r;
        }
        return 0;
    }

    var matrixGroup = ["CO2", "Mortality", "GDP"];

    let data = [];
    matrixGroup.forEach((mg)=>{
        matrixGroup.forEach((mgr)=>{
            let obj = {};
            obj["group"] = mg;
            obj["relation"] = mgr;
            if(mg=='CO2' && mgr=='CO2'){
                obj['value'] = correlation(filterCo2[0][year],filterCo2[0][year])
            }
            else if(mg=='CO2' && mgr=='Mortality'){
                obj['value'] = correlation(filterCo2[0][year],filterpm[0][year])
            }
            else if(mg=='CO2' && mgr=='GDP'){
                obj['value'] = correlation(filterCo2[0][year],filtergdp[0][year])
            }
            else if(mg=='Mortality' && mgr=='CO2'){
                obj['value'] = correlation(filterpm[0][year],filterCo2[0][year])
            }
             else if(mg=='Mortality' && mgr=='Mortality'){
                obj['value'] = correlation(filterpm[0][year],filterpm[0][year])
            }
             else if(mg=='Mortality' && mgr=='GDP'){
                obj['value'] = correlation(filterpm[0][year],filtergdp[0][year])
            }
            else if(mg=='GDP' && mgr=='CO2'){
                obj['value'] = correlation(filtergdp[0][year],filterCo2[0][year])
            }
             else if(mg=='GDP' && mgr=='Mortality'){
                obj['value'] = correlation(filtergdp[0][year],filterpm[0][year])
            }
             else if(mg=='GDP' && mgr=='GDP'){
                obj['value'] = correlation(filtergdp[0][year],filtergdp[0][year])
            }

            data.push(obj);
        })
    })

    var matrixMargin = {top: 30, right: 30, bottom: 60, left: 50},
    matrixWidth = 500 - matrixMargin.left - matrixMargin.right,
    matrixHeight = 350 - matrixMargin.top - matrixMargin.bottom;

    var svg = d3.select(matrixId)
    .append("svg")
    .attr("width", matrixWidth + matrixMargin.left + matrixMargin.right)
    .attr("height", matrixHeight + matrixMargin.top + matrixMargin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + matrixMargin.left + "," + matrixMargin.top + ")");

    var x = d3.scaleBand()
    .range([ 0, matrixWidth ])
    .domain(matrixGroup)
    .padding(0.01);
    svg.append("g")
    .attr("transform", "translate(0," + matrixHeight + ")")
    .call(d3.axisBottom(x))

    var y = d3.scaleBand()
    .range([ matrixHeight, 0 ])
    .domain(matrixGroup)
    .padding(0.01);
    svg.append("g")
    .call(d3.axisLeft(y));

    var myColor = d3.scaleLinear()
    .range(["red", "#ff4d4d", "skyblue", "#00b300", "green"])
    .domain([-1, -0.5, 0, 0.5, 1])

    svg.selectAll()
        .data(data, function(d) {return d.group+':'+d.relation;})
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.group) })
        .attr("y", function(d) { return y(d.relation) })
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.value)} )


        var defs = svg.append('defs');

var linearGradient = defs.append('linearGradient')
		.attr('id', 'linear-gradient');

linearGradient
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "100%")
  .attr("y2", "0%");

linearGradient.selectAll("stop")
  .data([
    {offset: "0%", color: "#ff1a1a"},
    {offset: "20%", color: "#ff4d4d"},
    {offset: "40%", color: "#b3e6ff"},
    {offset: "60%", color: "#66ccff"},
    {offset: "80%", color: "#00b300"},
    {offset: "100%", color: "#006600"}
  ])
  .enter().append("stop")
  .attr("offset", function(d) { 
    return d.offset; 
  })
  .attr("stop-color", function(d) { 
    return d.color; 
  });

svg.append("rect")
  .attr("x", 10)
  .attr("y", matrixHeight+20)
  .attr("width", 390)
  .attr("height", 15)
  .style("fill", "url(#linear-gradient)");

var xLeg = d3.scaleLinear()
  .domain([-1,1])
  .range([10, 400]);

var axisLeg = d3.axisBottom(xLeg)
  .tickValues(myColor.domain())

let yp = matrixHeight+35;
svg
  .attr("class", "axis")
  .append("g")
  .attr("transform", "translate(0,"+ yp +")")
  .call(axisLeg);
}

}