
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

 coffeeBankApp.service('Reset', ['$resource', function($resource) {
  return $resource(
    "/resets/:id.json",
    {id: "@id"},
    {update: {method: "PUT"}}    
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



coffeeBankApp.factory('ItemFactory', ['Item', '$resource', '$rootScope', '$http', function(Item, $resource, $rootScope, $http) {
 
var ItemList = {};
ItemList.items = [];

  var getAllItems = function() {
      ItemList.items = Item.query();
    }

// -----------------------------------

 ItemList.addItem = function(newItem) {

      var item = new Item(newItem);   
      item.$save().then(function(data) {    
        
      }, function(response){
        console.log("ERROR:", response);

      });
  };


// -----------------------------------

 // Removes an Item from the database
 ItemList.deleteItem = function(id) {    
     new Item({id: id}).$remove().then(function() {         
     
     getAllItems();

      }), function(response){
        console.log("ERROR:", response);
     }
  };

// -----------------------------------

// Saves item to the current user
ItemList.saveItem = function(item) {     
   $http.post('/saveit', item).then(function(data) {
   

   }), function(response){
        console.log("ERROR:", response);
     }

  };


// -----------------------------------

  getAllItems();
  

  return ItemList;

}]);



//////////////////////////////////////////////////

