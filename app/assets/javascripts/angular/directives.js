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


coffeeBankApp.directive('dhChartTemplate', function() {
  return {
    
    restrict: 'E',
    // templateUrl: 'donut-chart-template.html',
    scope: {

      chartdata: '@chartdata'
    
      },

link: function($scope, $elem, $attr) {

var svg = d3.select($elem[0]).append("svg").attr("width",700).attr("height",300);

$attr.$observe('chartdata', function(value) {
  data = value;

var salesData=[
  {label:"Food", color:"#3366CC"},
  {label:"Drink", color:"#DC3912"},
  {label:"Coffee", color:"#FF9900"},
  {label:"Tea", color:"#109618"},
  {label:"Clothing", color:"#990099"}
];


// var svg = d3.select($elem[0]).append("svg").attr("width",700).attr("height",300);
// var svg = d3.select("#my-chart-here").append("svg").attr("width",700).attr("height",300).append("g").attr("id","salesDonut");

console.log(data);

svg.append("g").attr("id","salesDonut");
svg.append("g").attr("id","quotesDonut");

Donut3D.draw("salesDonut", randomData(), 150, 150, 130, 100, 30, 0.4);
Donut3D.draw("quotesDonut", randomData(), 450, 150, 130, 100, 30, 0);
  
function changeData(){
  Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
  Donut3D.transition("quotesDonut", randomData(), 130, 100, 30, 0);
}

function randomData(){
  return salesData.map(function(d){ 
    return {label:d.label, value:1000*Math.random(), color:d.color};});
}



     }); 
    }
  };
});


//////////////////////////////////////////