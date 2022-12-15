//Read the data
  var color = "Reds";
  var year = 1990;
  var country = 'AFG';
  var country_name = 'Afghanistan';
  var mapData;
  var co2Data;
  var co2tempData;
  var pmCO2Data;
  var pmCO2tempData;
  var gdpData;
  var pmData;
  var villageData;

  Promise.all([
        d3.json('data/world-topojson.json'),
        d3.csv('data/CO2_DATASET.csv'),
        d3.csv('data/DEATH_DATASET.csv'),
        d3.csv('data/GDP_DATASET.csv'),
        d3.csv('data/pm_dataset.csv'),
        d3.csv('data/VIL_DATASET.csv')
    ]).then(([map_data, co2, death, gdp, pm, village])=>{
      mapData = map_data;
      co2Data = co2;
      co2tempData = co2Data;
      pmCO2Data = pm;
      pmCO2tempData = pm;
      gdpData = gdp;
      pmData = death;
      villageData = village;
      document.getElementById('selCountry').innerHTML = country_name;
      document.getElementById('textInput').innerHTML = year;
      WorldMap(mapData, "#map", pmData, year, color);
      Matrix(co2Data, gdpData, pmData, year, country, "#matrix");
      lineChart(pmData, "#pmLine", "red", year, country);
      lineChart(co2Data, "#co2Line", "blue", year, country);
      lineChart(gdpData, "#gdpLine", "green", year, country);
      Pie(villageData, year, country, "#pie");
      document.getElementById('rating').innerHTML = "Countries Rating for <br/>Molarity in " + year;
      Table("#table", pmData, year);
    });


    function ChangeYear(value) {
        year = value;
        document.getElementById('textInput').innerHTML = value;
        document.getElementById('selCountry').innerHTML = country_name;
        lineChart(pmData, "#pmLine", "red", year, country); 
        lineChart(co2Data, "#co2Line", "blue", year, country);
        lineChart(gdpData, "#gdpLine", "green", year, country);
        Matrix(co2Data, gdpData, pmData, year, country, "#matrix");
        Pie(villageData, year, country, "#pie")
        if(color=='Reds'){
            WorldMap(mapData, "#map", pmData, year, color);
            document.getElementById('rating').innerHTML = "Countries Rating for <br/>Molarity in " + year;
            Table("#table", pmData, year)
        }
        else if (color == 'Blues') {
            WorldMap(mapData, "#map", co2Data, year, color);
            document.getElementById('rating').innerHTML = "Countries Rating for <br/>CO2 Emission in " + year;
            Table("#table", co2Data, year)
        }
        else if (color == 'Greens') {
            WorldMap(mapData, "#map", gdpData, year, color);
            document.getElementById('rating').innerHTML = "Countries Rating for <br/>GDP in " + year;
            Table("#table", gdpData, year)
        }            
    }

    function ChangeColor(value){
        let ddVal = document.getElementById("dd").value;
        if(ddVal=='co2'){
            co2Data = co2tempData;
        }
        else if(ddVal=='pm'){
            co2Data = pmCO2tempData;
        } 
        color = value;
        lineChart(pmData, "#pmLine", "red", year, country);
        lineChart(co2Data, "#co2Line", "blue", year, country);
        lineChart(gdpData, "#gdpLine", "green", year, country);
        Matrix(co2Data, gdpData, pmData, year, country, "#matrix");
        if (color == 'Reds') {
            WorldMap(mapData, "#map", pmData, year, color);
            document.getElementById('rating').innerHTML = "Countries Rating for <br/>Molarity in " + year;
            Table("#table", pmData, year)
        }
        else if (color == 'Blues') {
            WorldMap(mapData, "#map", co2Data, year, color);
            document.getElementById('rating').innerHTML = "Countries Rating for <br/>CO2 Emission in " + year;
            Table("#table", co2Data, year)
        }
        else if (color == 'Greens') {
            WorldMap(mapData, "#map", gdpData, year, color);
            document.getElementById('rating').innerHTML = "Countries Rating for <br/>GDP in " + year;
            Table("#table", gdpData, year)
        }
    }