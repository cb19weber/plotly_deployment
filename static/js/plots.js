// Establish connection to data
const cityData = cityGrowths;

var sortedCities = cityData.sort((growthA, growthB) => growthB.Increase_from_2016 - growthA.Increase_from_2016);

var topFiveCities = sortedCities.slice(0,7);
console.log(topFiveCities);

var topFiveCityNames = topFiveCities.map(cName => cName.City);
var topFiveCityGrowths = topFiveCities.map(cPop => parseInt(cPop.Increase_from_2016));

trace = [{
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
}];
layout = {
    title: "Fastest Growing Cities",
    xaxis: {title: "City"},
    yaxis: {title: "Population Growth, 2016-2017"}
};

Plotly.newPlot("plotArea", trace, layout);