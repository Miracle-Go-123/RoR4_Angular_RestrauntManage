
 coffeeBankApp.service('User', ['$resource', function($resource) {
  return $resource(
    "/users/:id.json",
    {id: "@id"},
    {update: {method: "PUT"}}      
  );
}]);

 //////////////////////////

 coffeeBankApp.service('Login', ['$resource', function($resource) {
  return $resource(
    "/login"    
  );
}]);


//////////////////////////

 coffeeBankApp.service('Item', ['$resource', function($resource) {
  return $resource(
    "/items/:id.json",
    {id: "@id"},
    {update: {method: "PUT"}}  
  );
}]);


//////////////////////////

 coffeeBankApp.factory('CurrentUser', ['User', function(User) {
  var CurrentUser = {};

 var getCurrentUser = function() {
      User.get(function(user){
 		// $rootScope.currentUser = user;
      	CurrentUser = user;
      })
    }

  getCurrentUser();

  // ----------------

  return CurrentUser;

}]);

//////////////////////////

coffeeBankApp.factory('ItemFactory', ['Item', '$resource', '$rootScope', function(Item, $resource, $rootScope) {
 
var ItemList = {};
  
 


 ItemList.addItem = function(newItem) {
   console.log("new item", newItem);

      var item = new Item(newItem);
      
      item.$save().then(function(data) {
      
      console.log("save", data);     
        
      }, function(response){
        console.log("response", response);

      });
  };






  return ItemList;

}]);



//////////////////////////////////////////////////



























 // --------------------------------------------------

  