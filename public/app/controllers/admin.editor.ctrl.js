(function() {
  'use strict';
	var EditorCtrl = function($http, ngDialog, ngNotify, User, Editor){
		var _this = this;
    _this.aircrafts = []; // all aircrafts
    _this.aircraft = {}; // single aircraft

    (function() {
      let currentYear = new Date().getFullYear();
      let startYear = 1945
      let years = [];
      while( startYear <= currentYear){
        years.push(startYear++);
      }
      _this.yearsArray = years.reverse();

    }());

    _this.toggleConstantsMenu = function(id){
      angular.element('#'+id).slideToggle()
    };

    _this.toggleConstantsInitialState = function(){
      let selectors = [
        "#airCraftManufacturersList",
        "#rolesList",
        "#industriesList",
        "#aircraftTypesList"
      ].join(',');
      angular.element(selectors).slideUp();
    };
    _this.toggleConstantsInitialState();

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
      console.log(_this.editorFormData);
      // Editor.createAircraft(_this.editorFormData).then(function(data){
      //   console.log(data);
      // }, function(error){
      //   console.error(error);
      // });
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

    // modal dialog
    _this.launchModalDialog = function(context, object){
      var blah = {};
      var dialog = ngDialog.open({
        template: 'app/views/admin/editor/modal.constants.html',
        width: '50%',
        controllerAs: 'vm',
        controller: function(){
          var self = this;
          self.context = context;
          self.constants = object;
        },
        data: { x: self.selectedItems }
        // controller: ['$scope', function($scope){
        //   $scope.constants = object;
        //   $scope.context = context;
        //   $scope.model = {};
        //   // _this.editorFormData.tempData = $scope.model.selectedItems;
        //
        // }]
      });
    };



    (function() { //"#airCraftManufacturersList, #rolesList, #industriesList, aircraftTypesList"
      // let selectors = [
      //   "#airCraftManufacturersList",
      //   "#rolesList",
      //   "#industriesList",
      //   "#aircraftTypesList"
      // ].join(',');
      // angular.element(selectors).slideUp();
    }());
	}; // END

	/* ==========================================================
		setup
	============================================================ */
	angular.module('Airborne').controller('EditorCtrl',[
		'$http',
    'ngDialog',
    'ngNotify',
    'User',
    'Editor',
		EditorCtrl
	]);
})();
