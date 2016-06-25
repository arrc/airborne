(function(){
	'use strict';

	var Editor = function($http, $q){
    var o = {};

		// retrive constants
		o.retriveConstants = function(){
			var dfd = $q.defer();
			$http.get('/api/admin/editor/constants')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// create Aircraft
		o.createAircraft = function(editorFormData){
			var dfd = $q.defer();
			$http.post('/api/admin/editor', editorFormData)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive Aircrafts
		o.retriveAircrafts = function(){
			var dfd = $q.defer();
			$http.get('/api/admin/editor')
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// retrive single aircraft
		o.retriveAircraft = function(airCraftId){
			var dfd = $q.defer();
			$http.get('/api/admin/editor/' + airCraftId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// update aircraft details
		o.updateAircraft = function(aircraft){
			var dfd = $q.defer();
			$http.put('/api/admin/editor/' + aircraft._id, aircraft)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

		// delete camp
		o.deleteAircraft = function(airCraftId){
			var dfd = $q.defer();
			$http.delete('/api/admin/editor/' + airCraftId)
				.success(function(res){
					dfd.resolve(res.data);
				})
				.error(function(error){
					dfd.reject(error);
				});
			return dfd.promise;
		};

    return o;
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('Airborne').factory('Editor',[
    '$http',
		'$q',
		Editor
	]);
})();
