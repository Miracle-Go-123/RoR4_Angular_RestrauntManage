
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

//  coffeeBankApp.factory('CurrentUser', ['User', function(User) {
//   var CurrentUser = {};

//  var getCurrentUser = function() {
//       User.get(function(user){
//       	CurrentUser = user;
//       })
//     }

//   getCurrentUser();

//   // ----------------

//   return CurrentUser;

// }]);

//////////////////////////

coffeeBankApp.factory('ItemFactory', ['Item', '$resource', '$rootScope', '$http', function(Item, $resource, $rootScope, $http) {
 
var ItemList = {};
ItemList.items = [];

  var getAllItems = function() {
      ItemList.items = Item.query();
      // console.log(ItemList.items);
    }


 ItemList.addItem = function(newItem) {

      var item = new Item(newItem);   
      item.$save().then(function(data) {
      // console.log("save", data);     
        
      }, function(response){
        console.log("response", response);

      });
  };


 // Removes an Item from the database
 ItemList.deleteItem = function(id) {    
     new Item({id: id}).$remove().then(function() {         
     getAllItems();

      }), function(response){
        console.log("response", response);
     }
  };



ItemList.saveItem = function(item) {     
   $http.post('/saveit', item).then(function(data) {
    console.log("HOWDY!", data);
   }), function(response){
        console.log("response", response);
     }

  };



  getAllItems();

  return ItemList;

}]);



//////////////////////////////////////////////////

