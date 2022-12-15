function Pie(PieData, year, country, pieId){

    var fdata = PieData.filter(function(d){ return d.Country_Code==country;});
    
    d3.select(pieId).html("");
    
    if(fdata.length>0){
        var data = [];
        let obj = {};
        obj["name"] = "Rural";
        obj["value"] = fdata[0][year];
        data.push(obj);
        let obj1 = {};
        obj1["name"] = "Urban";
        obj1["value"] = 100 - fdata[0][year];
        data.push(obj1);
        var pieWidth = 200;
        var pieHeight = 200;
        var thickness = 40;
        var duration = 750;
        var padding = 10;
        var opacity = .8;
        var opacityHover = 1;
        var otherOpacityOnHover = .8;
        var tooltipMargin = 13;

        var radius = Math.min(pieWidth-padding, pieHeight-padding) / 2;
        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var svg = d3.select(pieId)
        .append('svg')
        .attr('class', 'pie')
        .attr('width', pieWidth)
        .attr('height', pieHeight);

        var g = svg.append('g')
        .attr('transform', 'translate(' + (pieWidth/2) + ',' + (pieHeight/2) + ')');

        var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

        var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

        var path = g.selectAll('path')
        .data(pie(data))
        .enter()
        .append("g")  
        .append('path')
        .attr('d', arc)
        .attr('fill', (d,i) => color(i))
        .style('opacity', opacity)
        .style('stroke', 'black')

        var labels = g.selectAll('parts')
        .data(pie(data))
        .enter()
        .append('text')
        .text(function(d){ return (Number(d.data.value)).toFixed(3) + "%"})
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")";  })
        .style("text-anchor", "middle")
        .style("font-size", 10)
        

        let legend = d3.select(pieId).append('div')
                    .attr('class', 'legend')
                    .style('margin-top', '30px');

        let keys = legend.selectAll('.key')
                    .data(data)
                    .enter().append('div')
                    .attr('class', 'key')
                    .style('display', 'flex')
                    .style('align-items', 'center')
                    .style('margin-right', '20px');

                keys.append('div')
                    .attr('class', 'symbol')
                    .style('height', '10px')
                    .style('width', '10px')
                    .style('margin', '5px 5px')
                    .style('background-color', (d, i) => color(i));

                keys.append('div')
                    .attr('class', 'name')
                    .text(d => `${d.name}`);

                keys.exit().remove();
    }
}