'use strict';

let User = require('../models/user.model.js'),
  Aircraft = require('../models/aircraft.model'),
  constants = require('../config/constants'),
  _ = require('lodash');

// Single aircraft
exports.constants = function(req, res){
  let sortedConstants = {
    roles: constants.roles.sort(),
    industries: constants.industries.sort(),
    aircraftTypes: constants.aircraftTypes.sort(),
    categories: constants.categories.sort(),
    engineTypes: constants.engineTypes.sort(),
    airCraftManufacturers: constants.airCraftManufacturers.sort(),
    engineManufacturers: constants.engineManufacturers.sort(),
    productionStatus: constants.productionStatus.sort()
  };
  return res.status(200).json({ data: sortedConstants, message: 'success'});
};

//  create aircraft
exports.createAircraft = function(req, res){
  console.log(req.body);
  Aircraft.create(req.body, function(err, aircraft){
    if (err || !aircraft) {
      return res.status(400).json({error: err, message: 'Error creating aircraft.'});
    } else {
      console.log(aircraft);
      return res.status(200).json({ data: aircraft, message: 'success'});
    }
  });
};

// update aircraft
exports.updateAircraft = function(req, res){
  var aircraft = req.aircraft;
  aircraft = _.extend(aircraft, req.body);
  aircraft.save(function(err, doc){
    if (err || !doc) {
      return res.status(400).json({message: 'Error finding aircraft.'});
    } else {
      return res.status(200).json({ data: doc, message: 'success'});
    }
  });
};

// Single aircraft
exports.retriveAircraft = function(req, res){
  return res.status(200).json({ data: req.aircraft, message: 'success'});
};

// All aircraft
exports.retriveAircrafts = function(req, res){
  Aircraft.find({}).exec(function(err, aircraft){
    if (err || !aircraft) {
      return res.status(400).json({message: 'Error finding aircraft.'});
    } else {
      return res.status(200).json({ data: aircraft, message: 'success'});
    }
  });
};

// Delete aircraft
exports.deleteAircraft = function(req, res){
  var aircraft = req.aircraft;
  aircraft.remove(function(err){
    if (err) {
      return res.status(400).json({message: 'Error deleting aircraft.'});
    } else {
      return res.status(200).json({ message: 'successfully deleted aircraft'});
    }
  });
};

// airCraftId
exports.airCraftId = function(req, res, next, airCraftId){
  Aircraft.findById(airCraftId).exec(function(err, doc){
    if (err) return next(err);
		if (!doc) return next(new Error('Failed to load aircraft ' + airCraftId));
		req.aircraft = doc;
		next();
  });
};
