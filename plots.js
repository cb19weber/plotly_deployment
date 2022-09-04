// Practice chart building using Plotly
var trace = {
    labels: ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", 
        "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", 
        "nonalcoholic mai tai", "nonalcoholic gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: "pie"
};

data = [trace];

var layout = {
    title: "Nonalcoholic Beverage Popularity",
    // xaxis: {title: "Drinks"},
    // yaxis: {title: "Percent of Drinks Ordered"}
};

Plotly.newPlot("plotArea", data, layout);

// Practice building functions and applying functions over arrays
var numbers = [1,2,3,4,5];
var doubled = numbers.map(number => number * 2);
var squares = numbers.map(number => number ** 2);
console.log(doubled);
console.log(squares);

numbers = [0,2,4,6,8];
var addFive = numbers.map(number => number + 5);
console.log(addFive)

var cities = [
    {
      "Rank": 1,
      "City": "San Antonio ",
      "State": "Texas",
      "Increase_from_2016": "24208",
      "population": "1511946"
    },
    {
      "Rank": 2,
      "City": "Phoenix ",
      "State": "Arizona",
      "Increase_from_2016": "24036",
      "population": "1626078"
    },
    {
      "Rank": 3,
      "City": "Dallas",
      "State": "Texas",
      "Increase_from_2016": "18935",
      "population": "1341075"
    }
];

var cityNames = cities.map(cName => cName.City);
console.log(cityNames)

var cityPops = cities.map(cPop => cPop.population);
console.log(cityPops)