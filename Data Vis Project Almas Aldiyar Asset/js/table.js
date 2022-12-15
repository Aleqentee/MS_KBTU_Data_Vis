function Table(tableId, data, year){
    d3.select(tableId).html("");
    var topData = data.sort(function (a, b) {
        return d3.descending(+a[year], +b[year]);
        }).slice(0, 10);
    let tableData = [];
    topData.forEach((e, i) => {
        let obj = [];
        obj[0] = i+1;
        obj[1] = e.Country;
        tableData[i] = obj;
    });

   let table = d3.select(tableId).append('table')
                .style("border-collapse", "collapse")
                .style("border", "2px black solid");

  table.append("thead").append("tr")
    .selectAll("th")
    .data(["Rating", "Country"])
    .enter().append("th")
    .text(function(d) { return d; })
    .style("border", "1px black solid")
    .style("padding", "5px")
    .style("background-color", "lightgray")
    .style("font-weight", "bold")
    .style("text-transform", "uppercase");

  table.append("tbody")
    .selectAll("tr").data(tableData)
    .enter().append("tr")
    .selectAll("td")
    .data(function(d){return d;})
    .enter().append("td")
    .style("border", "1px black solid")
    .style("padding", "5px")
    .text(function(d){return d;})
    .style("font-size", "12px");
}