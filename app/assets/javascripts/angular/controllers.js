coffeeBankApp.controller("MainController", ["$scope", "$http", "User", "$rootScope", "Login", function($scope, $http, User, $rootScope, Login) {

  $scope.loginForm = false;
  $scope.signUpForm = false;
  $scope.newUser = {name: "", email: "", picture: "", password: ""};

  var getCurrentUser = function() {
      User.get(function(user){
 		$rootScope.currentUser = user;
      	 // console.log(user.picture);
      })
    }

  getCurrentUser();



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

        console.log("response", response.data.email[0]); 
        $scope.authError = response.data.email[0];
        $scope.auth_form.submitted = true;

      });
} else {
	$scope.auth_form.submitted = true;
  }
};

$scope.LoginUser = function(){
if ($scope.login_form.$valid) {
      var user = new Login($scope.newUser);
     console.log("user", user);
     console.log($scope.newUser);
      user.$save().then(function(data) {     
        // $scope.newUser.name = "";
        // $scope.newUser.email = "";
        // $scope.newUser.picture = "";
        // $scope.newUser.password = "";
        // $scope.loginForm = false;
        // $scope.auth_form.submitted = false;
        // $scope.authError = false;
        // $rootScope.currentUser = user;
      }, function(response){

        console.log("response", response)

      });
} else {
	$scope.login_form.submitted = true;
	console.log("HIIIIII");
  }
};

// $scope.LogOut = function(){

// 	$http.delete('/logout').then(function(data){
// 		console.log(data);
// 	})
// };







}]);

// ----------------------------------------

coffeeBankApp.controller("ItemsController", ["$scope", "$http", function($scope, $http) {

  $scope.test = "Yo yo home slice!";


}]);