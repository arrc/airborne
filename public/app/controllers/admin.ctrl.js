(function() {
  'use strict';
	var AdminCtrl = function($http, ngDialog, ngNotify, User, Editor){
		var _this = this;
    _this.aircrafts = []; // all aircrafts
    _this.aircraft = {}; // single aircraft


    // _this.constants = Editor.retriveConstants();
    _this.retriveConstants = function(){
      Editor.retriveConstants().then(function(data){
        console.log(data);
        _this.constants = data;
      }, function(error){
        console.error(error);
      });
    };

// create aircraft
    _this.createAircraft = function(){
      Editor.createAircraft(_this.editorFormData).then(function(data){
        console.log(data);
      }, function(error){
        console.error(error);
      });
    };

// retrive aircrafts
    _this.retriveAircrafts = function(){
      Editor.retriveAircrafts().then(function(data){
        _this.aircrafts = data;
        console.log('Aircrafts: \t', _this.aircrafts);
      }, function(error){
        console.error(error);
      });
    };

// delete aircraft
    _this.deleteAircraft = function(aircraft){
      var index = _this.aircrafts.indexOf(aircraft);
      Editor.deleteAircraft(aircraft._id).then(function(){
        _this.aircrafts.splice(index, 1);
        ngNotify.set('Aircraft deleted successfully ', 'error');
      });
    };
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('Airborne').controller('AdminCtrl',[
		'$http',
    'ngDialog',
    'ngNotify',
    'User',
    'Editor',
		AdminCtrl
	]);
})();
