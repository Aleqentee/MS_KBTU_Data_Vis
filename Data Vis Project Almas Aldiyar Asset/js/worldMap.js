function WorldMap(countries, divId, contries, year, color) {

    d3.select(divId).html("");

    var width = 1000,
        height = 500;

    var svg = d3.select(divId)
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    var projection = d3.geoEquirectangular()
        .scale(150)
        .translate([width / 2.2, height / 2]);

    var geoPath = d3.geoPath()
        .projection(projection);

    var myColor = d3.scaleSequential(d3["interpolate" + color])
    .domain([d3.min(contries, function(d){ return +d[year];}), d3.max(contries, function(d){ return +d[year];})])

    svg.append("g")
        .selectAll("path")
        .data(topojson.feature(countries, countries.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", geoPath)
        .attr("class", "countrymap")
        .attr("id", function(d){ return d.properties.admin;})
        .style('stroke', 'white')
        .style('stroke-width', 0.5)
        .style("opacity", function (d) {
            return d.properties.admin==country? 1:0.5;
        })
        .attr("fill", function (d) {
            var test = contries.filter(function(c){ return d.properties.id==c.Country_Code;})
            
            return (test.length>0 ? myColor(test[0][year]) : 'lightgrey');
        })
        .on("click", function(d){
            d3.selectAll(".countrymap").style("opacity", 0.5);
            d3.select(this).style("opacity", 1);
            country = d.properties.id;
            country_name = d.properties.admin;
            document.getElementById('selCountry').innerHTML = country_name;
            lineChart(pmData, "#pmLine", "red", year, country);
            lineChart(co2Data, "#co2Line", "blue", year, country);
            lineChart(gdpData, "#gdpLine", "green", year, country);
            Matrix(co2Data, gdpData, pmData, year, country, "#matrix");
            Pie(villageData, year, country, "#pie")
        })

}