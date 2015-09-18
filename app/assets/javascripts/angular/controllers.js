coffeeBankApp.controller("MainController", ["$scope", "$http", "User", "$rootScope", "Login", "$location", function($scope, $http, User, $rootScope, Login, $location) {

// -----------------------------------

  var getCurrentUser = function() {
      User.get(function(user){
 		$rootScope.currentUser = user;
      	
      })
    }

  getCurrentUser();



}]);

//////////////////////////////////////////////

coffeeBankApp.controller("AuthController", ["$scope", "$http", "User", "$rootScope", "Login", "$location", function($scope, $http, User, $rootScope, Login, $location) {

  $scope.newUser = {name: "", email: "", picture: "", password: ""};

// -----------------------------------

$scope.AddUser = function(){
if ($scope.auth_form.$valid) {
      var user = new User($scope.newUser);
      
      user.$save().then(function(data) {     
        $scope.newUser.name = "";
        $scope.newUser.email = "";
        $scope.newUser.picture = "";
        $scope.newUser.password = "";
        $scope.auth_form.submitted = false;
        $scope.authError = false;
        $rootScope.currentUser = user;
        $location.path("/");
      }, function(response){
        $scope.authError = response.data.email[0];
        $scope.auth_form.submitted = true;

      });
} else {
  $scope.auth_form.submitted = true;
  }
};

// -----------------------------------

$scope.LoginUser = function(){
if ($scope.login_form.$valid) {
     var user = new Login($scope.newUser);
    
      user.$save().then(function(data) {   
        $scope.newUser.name = "";
        $scope.newUser.email = "";
        $scope.newUser.picture = "";
        $scope.newUser.password = "";
        $scope.login_form.submitted = false;
        $scope.loginError = false;
        $rootScope.currentUser = user;
        $location.path("/");
      }, function(response){
        $scope.loginError = "email / password combination is invalid"
      });
} else {
  $scope.login_form.submitted = true;
  }
};


}]);

//////////////////////////////////////////////

coffeeBankApp.controller("ItemsController", ["$scope", "$http", "User", "$rootScope", "$location", "ItemFactory", function($scope, $http, User, $rootScope, $location, ItemFactory) {

 $scope.newItem = {name: "", price: null, picture: "", category: ""};
 $scope.itemForm = false;
 // $scope.AddItem = ItemFactory.addItem
 $scope.items = ItemFactory.items



$scope.AddItem = function(){
if ($scope.item_form.$valid) {

        ItemFactory.addItem($scope.newItem)
        $scope.items.push($scope.newItem);
        $scope.newItem = {name: "", price: null, picture: "", category: ""};
        $scope.itemForm = false;
        $scope.item_form.submitted = false;
        $scope.item_form.$setUntouched();
       

} else {

  $scope.item_form.submitted = true;

  }
};

$scope.ResetItemForm = function(){
        $scope.newItem = {name: "", price: null, picture: "", category: ""};
        $scope.itemForm = false;
        $scope.item_form.submitted = false;
        $scope.item_form.$setUntouched();       
};




}]);

//////////////////////////////////////////////

// coffeeBankApp.controller("LocationController", ["$scope", "$route", "$routeParams", "$location", function($scope, $route, $routeParams, $location) {
//   $scope.$location = {};
//   angular.forEach("protocol host port path search hash".split(" "), function(method){
//    $scope.$location[method] = function(){
//      var result = $location[method].call($location);
//      return angular.isObject(result) ? angular.toJson(result) : result;
//    };
//   });
// }]);