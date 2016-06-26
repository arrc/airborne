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
