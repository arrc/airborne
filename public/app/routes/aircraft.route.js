'use strict';

angular.module('Airborne').config(['$stateProvider', function($stateProvider){
  $stateProvider
  $stateProvider
  .state('aircrafts', {
    url: '/aircrafts',
    templateUrl: 'app/views/aircraft/aircraft.list.html'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'app/views/aircraft/aircraft.search.html'
  })
  .state('view', {
    url: '/view',
    templateUrl: 'app/views/aircraft/aircraft.view.html'
  });
}]);
