(function() {
  'use strict';
	var AircraftCtrl = function($http, $stateParams, ngDialog, ngNotify, User, Editor, Aircraft){
		var _this = this;
    _this.aircrafts = []; // all aircrafts
    _this.aircraft = {}; // single aircraft

// retrive aircrafts
    _this.retriveAircrafts = function(){
      Aircraft.retriveAircrafts().then(function(data){
        _this.aircrafts = data;
        console.log('Aircrafts: \t', _this.aircrafts);
      }, function(error){
        console.error(error);
      });
    };

  // retrive aircraft
      _this.retriveAircraft = function(airCraftId){
        Aircraft.retriveAircraft($stateParams.airCraftId).then(function(data){
          _this.aircraft = data;
          console.log('Aircrafts: \t', _this.aircrafts);
        }, function(error){
          console.error(error);
        });
      };
    } // END
	/* ==========================================================
		setup
	============================================================ */
	angular.module('Airborne').controller('AircraftCtrl',[
		'$http',
    '$stateParams',
    'ngDialog',
    'ngNotify',
    'User',
    'Editor',
    'Aircraft',
		AircraftCtrl
	]);
})();
