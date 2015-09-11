var coffeeBankApp = angular.module("CoffeeBankApp", ["ngRoute", "ngResource"]);

coffeeBankApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

coffeeBankApp.config(["$routeProvider", function($routeProvider) {

$routeProvider
      .when('/', {
        templateUrl: 'partials/items.html',
        controller: 'ItemsController'
      });

}]);
