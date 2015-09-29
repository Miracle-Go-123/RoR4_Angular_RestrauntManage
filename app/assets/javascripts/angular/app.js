var coffeeBankApp = angular.module("CoffeeBankApp", ["ngRoute", "ngResource", "Devise", "ngAnimate", "ng-uploadcare"]);

coffeeBankApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);

coffeeBankApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

$locationProvider.html5Mode(true);

$routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'MainController'
      })
      .when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'AuthController'
        })
      .when('/signup', {
         templateUrl: 'partials/signin.html',
         controller: 'AuthController'
        })
      .when('/resets', {
         templateUrl: 'partials/reset.html',
         controller: 'AuthController'
        })
      .otherwise({ redirectTo: '/'});

}]);
