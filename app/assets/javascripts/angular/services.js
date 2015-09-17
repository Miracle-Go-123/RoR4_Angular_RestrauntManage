
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


 // --------------------------------------------------

  