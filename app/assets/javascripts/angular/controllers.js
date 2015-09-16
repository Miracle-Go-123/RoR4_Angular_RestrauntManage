coffeeBankApp.controller("MainController", ["$scope", "$http", "User", "$rootScope", "Login", function($scope, $http, User, $rootScope, Login) {

  $scope.loginForm = false;
  $scope.signUpForm = false;
  $scope.newUser = {name: "", email: "", picture: "", password: ""};

// -----------------------------------

  var getCurrentUser = function() {
      User.get(function(user){
 		$rootScope.currentUser = user;
      	
      })
    }

  getCurrentUser();

// -----------------------------------

$scope.AddUser = function(){
if ($scope.auth_form.$valid) {
      var user = new User($scope.newUser);
      user.$save().then(function(data) {     
        $scope.newUser.name = "";
        $scope.newUser.email = "";
        $scope.newUser.picture = "";
        $scope.newUser.password = "";
        $scope.signUpForm = false;
        $scope.auth_form.submitted = false;
        $scope.authError = false;
        $rootScope.currentUser = user;
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
     // console.log($scope.newUser);
      user.$save().then(function(data) {   
        // console.log("HI from User Save");
        $scope.newUser.name = "";
        $scope.newUser.email = "";
        $scope.newUser.picture = "";
        $scope.newUser.password = "";
        $scope.loginForm = false;
        $scope.login_form.submitted = false;
        $scope.loginError = false;
        $rootScope.currentUser = user;
      }, function(response){
        $scope.loginError = "email / password combination is invalid"
        // console.log("response", response)

      });
} else {
	$scope.login_form.submitted = true;
  }
};

}]);

// ----------------------------------------

coffeeBankApp.controller("ItemsController", ["$scope", "$http", function($scope, $http) {

  $scope.test = "Yo yo home slice!";


}]);