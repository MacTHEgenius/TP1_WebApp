var myApp = angular.module('webApp');
myApp.service('LoginPost', function($resource)
{
  var restAPIUrl = 'https://crispesh.herokuapp.com/api';
  return $resource(restAPIUrl + '/login_check/:id', 
  					{ id: '@id' } /*,
					{ update: {method: 'PUT'} }*/);
});
