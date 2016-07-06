'use strict';

let User = require('../models/user.model.js'),
  config = require('../config'),
  jwt = require('jsonwebtoken'),
  Aircraft = require('../models/aircraft.model'),
  _ = require('lodash');


exports.getAircrafts = function(req, res){
  Aircraft.find({}).exec(function(err, airCraftDocs){
    if (err || !airCraftDocs) {
      return res.status(400).json({message: 'Error finding Aircrafts.'});
    } else {
      res.status(200).json({ data: airCraftDocs, message: 'success'});
    }
  })
}


exports.getAircraft = function(req, res){
  Aircraft.findById(req.params.airCraftId).exec(function(err, airCraftDoc){
    if (err || !airCraftDoc) {
      return res.status(400).json({message: 'Error finding Aircraft.'});
    } else {
      res.status(200).json({ data: airCraftDoc, message: 'success'});
    }
  })
}

exports.searchAircrafts = function(req, res){
  let searchTerm = new RegExp(req.query.q, 'i'); console.log(req.query.q, searchTerm);
  Aircraft.find({ 'general.model' : new RegExp(req.query.q,'i')//, 'general.categories':  new RegExp(req.query.q,'i'),
    // '$or': [
    //   { 'general.model': searchTerm,
    //     'general.series': searchTerm,
    //     'general.category': searchTerm,
    //     'general.airCraftManufacturers': searchTerm,
    //     'general.roles': searchTerm,
    //     'general.industries': searchTerm,
    //     'general.aircraftTypes': searchTerm
    //   }]
  }).exec(function(err, airCraftDocs){
    if (err || !airCraftDocs) {
      return res.status(400).json({message: 'Error finding Aircraft.'});
    } else {
      res.status(200).json({ data: airCraftDocs, message: 'success'});
    }
  })
};

// this is terribely fucked-up, needs rewrite!
exports.favAircraft = function(req,res){
  let aircraft = req.aircraft;
  User.findById(req.user._id).exec(function(err, userDoc){
    userDoc.favourites = aircraft._id;
    userDoc.save(function(err, updatedUserDoc){
      // aircraft.meta.favCount += 1;
      aircraft.update({ $inc : { 'meta.favCount' : 1 } }, function(err, updated ,doc){
        if (err || !doc) {
          return res.status(400).json({error: err, message: 'Error updating Aircraft.'});
        } else {
          res.status(200).json({ data: doc, user: updatedUserDoc,  message: 'success'});
        }
      });
    })// userDoc
  })// User
};

exports.profile = function(req, res){
  User.findOne({'username': req.user.username}).exec(function(err, userDoc){
    if (err || !userDoc) {
      return res.status(400).json({message: 'Error finding user.'});
    } else {
      var userDocJson = userDoc.toJSON();
      var data = _.omit(userDocJson, 'password');
      res.status(200).json({ data: data, message: 'success'});
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
