
 coffeeBankApp.service('User', ['$resource', function($resource) {
  return $resource(
    "/users/:id.json",
    {id: "@id"},
    {update: {method: "PUT"}}
       
  );
}]);

 coffeeBankApp.service('Login', ['$resource', function($resource) {
  return $resource(
    "/login"    
  );
}]);


// Additional Auth Work

//  coffeeBankApp.factory('UserService', [function() {
//   var sdo = {
//     isLogged: false,
//     username: ''
//   };
//   return sdo;
// }]);

  