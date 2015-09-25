coffeeBankApp.directive('dhItemTemplate', function() {
  return {
    
  	restrict: 'E',
  	templateUrl: 'item-template.html',
    scope: {

      item: '=itemdata'
    
      },

    link: function(scope, element, attrs) {     

    }
  };
});


//////////////////////////////////////////


coffeeBankApp.directive('dhSaveTemplate', function() {
  return {
    
  	restrict: 'E',
  	templateUrl: 'save-template.html',
    scope: {

      save: '=savedata'
    
      },

    link: function(scope, element, attrs) {
      
    }
  };
});


//////////////////////////////////////////


coffeeBankApp.directive('dhGlobalSaveTemplate', function() {
  return {
    
    restrict: 'E',
    templateUrl: 'global-save-template.html',
    scope: {

      save: '=savedata'
    
      },

    link: function(scope, element, attrs) {
      
    }
  };
});


//////////////////////////////////////////


coffeeBankApp.directive('dhChartLegend', function() {
  return {
    
    restrict: 'E',
    templateUrl: 'chart-legend.html',
    scope: {

      cat: '=cat'
    
      },

    link: function(scope, element, attrs) {
      
    }
  };
});


//////////////////////////////////////////


coffeeBankApp.directive('dhChartTemplate', function() {
  return {
    
    restrict: 'E',
 // templateUrl: 'donut-chart-template.html',
    scope: {

      chartdata: '@chartdata',
      monthdata: '@monthdata'
    
      },

link: function($scope, $elem, $attr) {

// var svg = d3.select($elem[0]).append("svg").attr("width",700).attr("height",300);
var svg = d3.select("#user-chart").append("svg").attr("width",700).attr("height",300);
// Inserting text that goes on top of the charts.... 

svg.append("text")
        .attr("x", 300)             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "18px") 
        .style("font-weight", "bold")
     // .style("text-decoration", "underline") 
        .text("Monthly & Total Savings");

// $attr.$observe('chartdata', function(value) {
$scope.$watchGroup(['chartdata', 'monthdata'], function(value) {

var data = value[0]
var month = value[1]

var savingData=[
  {label:"food", color:"#A18F8F", saved:0},
  {label:"drinks", color:"#778752", saved:0},
  {label:"coffee", color:"#CC8F79", saved:0},
  {label:"tea", color:"#CC8F79", saved:0},
  {label:"clothing", color:"#607D8B", saved: 0},
  {label:"entertainment", color:"#C2B46B", saved: 0},
  {label:"travel", color:"#4A4A4A", saved: 0},
  {label:"other", color:"#4E857C", saved: 0}
];


// var svg = d3.select($elem[0]).append("svg").attr("width",700).attr("height",300);
// var svg = d3.select("#my-chart-here").append("svg").attr("width",700).attr("height",300).append("g").attr("id","salesDonut");


if (data) {

var chartdata = JSON.parse(data)
var monthdata = JSON.parse(month)

function getData(input) {

  // Maps the input into the savingData array of objects

  input.map(function(d){
  
    if (d.category === savingData[0].label) {
          savingData[0].saved += d.price;
    } else if (d.category === savingData[1].label) {
          savingData[1].saved += d.price;  
    } else if (d.category === savingData[2].label) {
          savingData[2].saved += d.price;          
    } else if (d.category === savingData[3].label) {
          savingData[2].saved += d.price;  
    } else if (d.category === savingData[4].label) {
          savingData[4].saved += d.price;  
    } else if (d.category === savingData[5].label) {
          savingData[5].saved += d.price;         
    } else if (d.category === savingData[6].label) {
          savingData[6].saved += d.price;   
    } else {
          savingData[7].saved += d.price;  
            }; 
         })
  return savingData;
  }

var total = getData(chartdata);
var month_total = getData(monthdata);

svg.append("g").attr("id","salesDonut");
svg.append("g").attr("id","quotesDonut");

Donut3D.draw("salesDonut", displayMonth(), 150, 150, 130, 100, 30, 0.4);
Donut3D.draw("quotesDonut", displayData(), 450, 150, 130, 100, 30, 0);
  
function changeData(){
  Donut3D.transition("salesDonut", displayMonth(), 130, 100, 30, 0.4);
  Donut3D.transition("quotesDonut", displayData(), 130, 100, 30, 0);
}

function displayData(){
  return total.map(function(d){ 
    return {label:d.label, value:d.saved, color:d.color};});
}

function displayMonth(){
  return month_total.map(function(d){ 
    return {label:d.label, value:d.saved, color:d.color};});
}

       }
     }); 
    }
  };
});

//////////////////////////////////////////


coffeeBankApp.directive('dhChartTwoTemplate', function() {
  return {
    
    restrict: 'E',
    
    scope: {

      chartdatatwo: '@chartdatatwo',
      monthdatatwo: '@monthdatatwo'
    
      },

link: function($scope, $elem, $attr) {

var svg = d3.select("#global-chart").append("svg").attr("width",700).attr("height",300);

// Inserting text that goes on top of the charts.... 

svg.append("text")
        .attr("x", 300)             
        .attr("y", 20)
        .attr("text-anchor", "middle")  
        .style("font-size", "18px") 
        .style("font-weight", "bold")
     // .style("text-decoration", "underline") 
        .text("Global Monthly & Total Savings");

// $attr.$observe('chartdata', function(value) {
$scope.$watchGroup(['chartdatatwo', 'monthdatatwo'], function(value) {

var data = value[0]
var month = value[1]

var savingData=[
  {label:"food", color:"#A18F8F", saved:0},
  {label:"drinks", color:"#778752", saved:0},
  {label:"coffee", color:"#CC8F79", saved:0},
  {label:"tea", color:"#CC8F79", saved:0},
  {label:"clothing", color:"#607D8B", saved: 0},
  {label:"entertainment", color:"#C2B46B", saved: 0},
  {label:"travel", color:"#4A4A4A", saved: 0},
  {label:"other", color:"#4E857C", saved: 0}
];


// var svg = d3.select($elem[0]).append("svg").attr("width",700).attr("height",300);
// var svg = d3.select("#my-chart-here").append("svg").attr("width",700).attr("height",300).append("g").attr("id","salesDonut");


if (data) {

var chartdata = JSON.parse(data)
var monthdata = JSON.parse(month)

function getData(input) {

  // Maps the input into the savingData array of objects

  input.map(function(d){
  
    if (d.category === savingData[0].label) {
          savingData[0].saved += d.price;
    } else if (d.category === savingData[1].label) {
          savingData[1].saved += d.price;  
    } else if (d.category === savingData[2].label) {
          savingData[2].saved += d.price;          
    } else if (d.category === savingData[3].label) {
          savingData[2].saved += d.price;  
    } else if (d.category === savingData[4].label) {
          savingData[4].saved += d.price;  
    } else if (d.category === savingData[5].label) {
          savingData[5].saved += d.price;         
    } else if (d.category === savingData[6].label) {
          savingData[6].saved += d.price;   
    } else {
          savingData[7].saved += d.price;  
            }; 
         })
  return savingData;
  }

var total = getData(chartdata);
var month_total = getData(monthdata);

svg.append("g").attr("id","salesDonutTwo");
svg.append("g").attr("id","quotesDonutTwo");

Donut3D.draw("salesDonutTwo", displayMonth(), 150, 150, 130, 100, 30, 0.4);
Donut3D.draw("quotesDonutTwo", displayData(), 450, 150, 130, 100, 30, 0);
  
function changeData(){
  Donut3D.transition("salesDonutTwo", displayMonth(), 130, 100, 30, 0.4);
  Donut3D.transition("quotesDonutTwo", displayData(), 130, 100, 30, 0);
}

function displayData(){
  return total.map(function(d){ 
    return {label:d.label, value:d.saved, color:d.color};});
}

function displayMonth(){
  return month_total.map(function(d){ 
    return {label:d.label, value:d.saved, color:d.color};});
}

       }
     }); 
    }
  };
});

//////////////////////////////////////////