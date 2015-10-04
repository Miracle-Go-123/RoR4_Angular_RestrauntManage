coffeeBankApp.controller("MainController", ["$scope", "$http", "User", "$rootScope", "Login", "$location", function($scope, $http, User, $rootScope, Login, $location) {

// -----------------------------------

  var getCurrentUser = function() {
      User.get(function(user){
 		$rootScope.currentUser = user;
      	
      });
    };

  getCurrentUser();

      $http.get('/getglobal').then(function(data) {      
      $scope.globalData = data.data.global;
      $scope.globalTotal = data.data.globalTotal;
      $scope.globalMonth = data.data.globalMonth;
      $scope.globalMonthTotal = data.data.globalMonthTotal;
          });
  
}]);


//////////////////////////////////////////////


coffeeBankApp.controller("AuthController", ["$scope", "$http", "User", "$rootScope", "Login", "$location", "ItemFactory", "Item", "Reset", function($scope, $http, User, $rootScope, Login, $location, ItemFactory, Item, Reset) {

  $scope.newUser = {name: "", email: "", picture: "", password: ""};
 
// -----------------------------------

$scope.AddUser = function(picture){
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
        // window.location.reload();
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
        $location.path("/");
         window.location.reload();
      }, function(response){
        $scope.loginError = "email / password combination is invalid";
      });
} else {
  $scope.login_form.submitted = true;
  }
};

// -----------------------------------


$scope.RequestReset = function(){
if ($scope.reset_form.$valid) {
     
     var user = new Reset($scope.newUser);
     
     user.$save().then(function(data) { 
     $scope.newUser.email = "";
     $scope.reset_form.submitted = false;
     $scope.loginError = false;
     $location.path("/");
       
     }, function(response){
        $scope.resetError = "email not found";
      });
} else {
  $scope.reset_form.submitted = true;
  }
};


}]);



//////////////////////////////////////////////



coffeeBankApp.controller("ItemsController", ["$scope", "$http", "User", "$rootScope", "$location", "ItemFactory", "Item", "$timeout", "$interval", function($scope, $http, User, $rootScope, $location, ItemFactory, Item, $timeout, $interval) {

 $scope.newItem = {name: "", price: null, picture: "", category: ""};
 $scope.itemForm = false;
 $scope.deleteMe = false;
 $scope.showItem = true;
 $scope.saveAction = false;
 $scope.items = ItemFactory.items;
 

 // -----------------------------------


 var getAllItems = function() {
      $scope.items = Item.query();
    };

  var getAllSaves = function() {

      $http.get('/getsaves').then(function(data) {      
      $scope.currentSaver = data.data.user;
      $scope.saves = data.data.saves;
      $scope.thisMonth = data.data.thisMonth;
      $scope.monthCat = data.data.monthCat;
      $scope.globalData = data.data.global;
      $scope.globalTotal = data.data.globalTotal;
      $scope.globalMonth = data.data.globalMonth;
      $scope.globalMonthTotal = data.data.globalMonthTotal;
   });
};

getAllSaves();

// -----------------------------------

$scope.ShowItems = function(){

if ($scope.showItem === false) {
   getAllItems();
   $scope.showItem = true;

} else {
$scope.showItem = false;
    }
};

// -----------------------------------

$scope.AddItem = function(){
if ($scope.item_form.$valid) {

        ItemFactory.addItem($scope.newItem);

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

// -----------------------------------

$scope.ResetItemForm = function(){
        $scope.newItem = {name: "", price: null, picture: "", category: ""};
        $scope.itemForm = false;
        $scope.item_form.submitted = false;
        $scope.item_form.$setUntouched();       
};

// -----------------------------------

$scope.DeleteItem = function(item, $index){
if ($scope.deleteMe === true) {
ItemFactory.deleteItem(item.id);
$scope.deleteMe = false;
$scope.items.splice($index, 1);

// Trying to avoid a full reset after deleting an item
// getAllItems();

    }
};

// -----------------------------------

$scope.SaveIt = function(item){
  
  if ($scope.deleteMe === false) {  
      
      // This action changes the background color
      // after a SAVE....
      $scope.saveAction = true;      
      $timeout(function(){ 
        $scope.saveAction = false; }, 1000);

         ItemFactory.saveItem(item);

// Request to get an updated list of saves as of the most recent save.
   getAllSaves();
    
   // Delays an API call incase the intial data doesn't render correctly.
   $timeout(function () {
      $http.get('/getsaves').then(function(data) {  
      $scope.currentSaver = data.data.user;
      $scope.saves = data.data.saves;
      $scope.thisMonth = data.data.thisMonth;
      $scope.monthCat = data.data.monthCat;
      $scope.globalData = data.data.global;
      $scope.globalTotal = data.data.globalTotal;
      $scope.globalMonth = data.data.globalMonth;
      $scope.globalMonthTotal = data.data.globalMonthTotal;
       });}, 1000); 
    
  }
};

// -----------------------------------

$scope.UndoSave = function(){

if ($scope.saves.length > 1) {
$http.delete('/lastsave').then(function(data) { 

getAllSaves();

  });
 }
};

// -----------------------------------

// Pings the api every 10 seconds to get current global data....
    $interval(function () {
      $http.get('/getglobal').then(function(data) {      
      $scope.globalData = data.data.global;
      $scope.globalTotal = data.data.globalTotal;
      $scope.globalMonth = data.data.globalMonth;
      $scope.globalMonthTotal = data.data.globalMonthTotal;
          });}, 10000);


}]);

//////////////////////////////////////////////