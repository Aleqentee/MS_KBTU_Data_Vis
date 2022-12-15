function lineChart(dataset, chartId, color, year, country){
    d3.select(chartId).html("");
    let data = [];
    let fdata = dataset.filter(function(d){ return d["Country_Code"]==country;})
    
    if(fdata.length>0){
        for(var i=1990; i<=2019; i++){
            let obj = {};
            obj['Country'] = country;
            obj['Year'] = i;
            obj['Value'] = fdata[0][i];
            data.push(obj);
        }

        var lineChartMargin = {top: 10, right: 50, bottom: 30, left: 50}
        , lineChartWidth = 250 - lineChartMargin.left - lineChartMargin.right 
        , lineChartHeight = 150 - lineChartMargin.top - lineChartMargin.bottom;
        
        var xScale = d3.scaleLinear()
            .domain([1990, 2019]) 
            .range([0, lineChartWidth]); 


        var yScale = d3.scaleLinear()
            .domain([d3.min(data,function(d){ return +d.Value;}), d3.max(data,function(d){ return +d.Value;})]) 
            .range([lineChartHeight, 0]); 

        var line = d3.line()
            .x(function(d, i) { return xScale(+d.Year) }) 
            .y(function(d) { return yScale(+d.Value); }) 
            .curve(d3.curveMonotoneX) 

        var svg = d3.select(chartId).append("svg").style("overflow", "visible")
            .attr("width", lineChartWidth + lineChartMargin.left + lineChartMargin.right)
            .attr("height", lineChartHeight + lineChartMargin.top + lineChartMargin.bottom)
            .append("g")
            .attr("transform", "translate(" + lineChartMargin.left + "," + lineChartMargin.top + ")");

        let xaxis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + lineChartHeight + ")")
            .call(d3.axisBottom(xScale).tickValues([1990, 2019]))
            
            svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", lineChartWidth)
            .attr("y", lineChartHeight + 30)
            .style("font-size", 10)
            .text("Year")

        if(color=='red'){
             svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -5)
            .attr("y", -45)
            .attr("transform", 'translate(0,0),' + 'rotate(-90)')
            .style("font-size", 10)
            .text("Mortality per 1000 people")
        }
        else if(color=='blue'){
             svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -5)
            .attr("y", -40)
            .attr("transform", 'translate(0,0),' + 'rotate(-90)')
            .style("font-size", 10)
            .text("Micrograms per cubic meter")
        }
        else if(color=='green'){
             svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -5)
            .attr("y", -40)
            .attr("transform", 'translate(0,0),' + 'rotate(-90)')
            .style("font-size", 10)
            .text("Economic growth")
        }

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale).ticks(5));

        svg.append("path")
            .datum(data) 
            .attr("class", "line") 
            .style("stroke", 'black')
            .attr("d", line);

        svg.append('circle')
        .attr("cx", xScale(year))
        .attr("cy", yScale(fdata[0][year]))
        .attr("r", 5)
        .style("fill", color);
    } 
}