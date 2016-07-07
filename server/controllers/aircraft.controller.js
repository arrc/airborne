'use strict';

let User = require('../models/user.model.js'),
  config = require('../config'),
  jwt = require('jsonwebtoken'),
  Aircraft = require('../models/aircraft.model'),
  async = require('async'),
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
  let fav = req.query.fav;
  let aircraft = req.aircraft;

  switch (fav) {
    case "true":
      performFavOperation(true);
      break;

    case "false":
      performFavOperation(false);
      break;

    default:
      res.status(200).json({ message: 'please provide input.'});
  }

  function performFavOperation(fav){
    async.series({
      "updateUser": function(done){
        User.findById(req.user._id).exec( (err, doc)=> {
          if(fav){
            doc.favourites.addToSet(aircraft._id);
          } else {
            doc.favourites.pull(aircraft._id);
          }
          doc.save((err, doc, numAffected) => { // numAffected - will return 0 or 1
            if(err || !numAffected) return done({error: err, message: "Failed to set as favourite."});
            done(null, {data: doc, success: true});
          })
        })
      },
      "updateAircraft": function(done){
        // let operator = fav ? '$inc' : '$dec'; console.log(operator);
        if(fav){
          aircraft.update({ $inc : { 'meta.favCount' : 1 } }).exec((err, updated) =>{ console.log(updated);
            if(err || !updated.ok) return done({error: err, message: "Failed to set this aircraft as favourite."});
            done(null, {success: true});
          })
        } else {
          aircraft.update({ $dec : { 'meta.favCount' : 1 } }).exec((err, updated) =>{ console.log(updated);
            if(err || !updated.ok) return done({error: err, message: "Failed to unfav this aircraft ."});
            done(null, {success: true});
          })
        }
      }
    }, function(err, response){
      if(err) return res.status(400).json(err);
      return res.status(200).json(response);
    })
  }
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
