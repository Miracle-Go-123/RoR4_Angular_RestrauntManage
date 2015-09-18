coffeeBankApp.directive('dhItemTemplate', function() {
  return {
    
  	restrict: 'E',
  	templateUrl: 'item-template.html',
    scope: {

      item: '='
    
      },

    link: function(scope, element, attrs) {
      

    }
  };
});