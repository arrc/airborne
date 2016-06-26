(function(){
	'use strict';

	var Aircraft = function($http, $q){
    var o = {};

		// retrive Aircrafts
		o.retriveAircrafts = function(){
			var dfd = $q.defer();
			$http.get('/api/aircrafts/')
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
			$http.get('/api/aircrafts/' + airCraftId)
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
	angular.module('Airborne').factory('Aircraft',[
    '$http',
		'$q',
		Aircraft
	]);
})();
