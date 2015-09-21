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

coffeeBankApp.controller("AuthController", ["$scope", "$http", "User", "$rootScope", "Login", "$location", "ItemFactory", "Item", function($scope, $http, User, $rootScope, Login, $location, ItemFactory, Item) {

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

 // var getAllItems = function() {
 //      $scope.items = Item.query();
 //    }

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

coffeeBankApp.controller("ItemsController", ["$scope", "$http", "User", "$rootScope", "$location", "ItemFactory", "Item", function($scope, $http, User, $rootScope, $location, ItemFactory, Item) {

 $scope.newItem = {name: "", price: null, picture: "", category: ""};
 $scope.itemForm = false;
 $scope.deleteMe = false;
 $scope.showItem = true;
 $scope.items = ItemFactory.items
 
 var getAllItems = function() {
      $scope.items = Item.query();
    }

$scope.ShowItems = function(){

if ($scope.showItem === false) {
   getAllItems();
   $scope.showItem = true;

} else {
$scope.showItem = false;
    }
}


$scope.AddItem = function(){
if ($scope.item_form.$valid) {

        ItemFactory.addItem($scope.newItem)
        
     // Adds a picture to the item based on category
      if ($scope.newItem.category === "food") {
      $scope.newItem.picture = "assets/Food-Sign.png"
      } else if ($scope.newItem.category === "drinks") {
      $scope.newItem.picture = "assets/Drinks.png" 
      } else if ($scope.newItem.category === "travel") {
      $scope.newItem.picture = "assets/Travel.png"
      } else if ($scope.newItem.category === "entertainment") {
      $scope.newItem.picture = "assets/Entertainment.png"
      } else if ($scope.newItem.category === "tea") {
      $scope.newItem.picture = "assets/Tea-Cup.png"
      } else if ($scope.newItem.category === "coffee") {
      $scope.newItem.picture = "assets/Coffee-Mug.png"
      } else if ($scope.newItem.category === "clothing") {
      $scope.newItem.picture = "assets/Clothing.png"
      } else {
      $scope.newItem.picture = "assets/Dollar.png"
    }
        // Use push() into the array if you want to incorporate the singular
        // addition of an item to the array. Ran into issues with formating this
        // with the current template.  
        // $scope.items.push($scope.newItem)
        $scope.newItem = {name: "", price: null, picture: "", category: ""};
        $scope.itemForm = false;
        $scope.item_form.submitted = false;
        $scope.item_form.$setUntouched();
        
        getAllItems();

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


$scope.DeleteItem = function(item, $index){
if ($scope.deleteMe === true) {
ItemFactory.deleteItem(item.id)
$scope.deleteMe = false;
$scope.items.splice($index, 1)

// Trying to avoid a full reset after deleting an item
// getAllItems();
    }
}

$scope.SaveIt = function(item){
  
  if ($scope.deleteMe === false) {  

      console.log("Save It");
      ItemFactory.saveItem(item)



  }
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