'use strict';

let User = require('../models/user.model.js'),
  config     = require('../config'),
  Aircraft = require('../models/aircraft.model'),
  constants = require('../config/constants'),
  _ = require('lodash'),
  async = require('async'),
  url = require('url'),
  shortid = require('shortid'),
  cloudinary = require('cloudinary');

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
  let formData = req.body;

  async.series({
    uploadImage: function(done){
      let counter = 0;
      _.forEach(formData.images, function(value, key){
        let customId = shortid.generate();
        let modelName = formData.general.model.split(" ").join("-");
        let publicId = `airborne/aircrafts/${modelName}/${modelName}-${key}-${customId}`; console.log(publicId);

        cloudinary.config({
          cloud_name: config.cloudinaryCloudName,
          api_key: config.cloudinaryApiKey,
          api_secret: config.cloudinaryApiSecret
        });

        cloudinary.uploader.upload(value, function(res){
          counter++;
          if(res.http_code === 400) return done({error: res, message: 'Failed to upload image.'});
          formData.images[key] = { "image": res.secure_url, "source": url.parse(value).hostname };
          if(counter === Object.keys(formData.images).length){
            done(null);
          }
        }, {public_id: publicId});
      });

    },
    saveInDatabase: function(done){
      Aircraft.create(formData, function(err, aircraft){
        if (err || !aircraft) {
          return done({error: err, message: 'Error creating aircraft.'})
        }
        console.log("saveInDatabase \n",aircraft);
        done(null, { data: aircraft, message: 'success'})
      });
    }
  }, function(err, results){
    if (err) {
      return res.status(400).json({error: err, message: 'Error creating aircraft.'});
    } else {
      return res.status(200).json(results.saveInDatabase);
    }
  });

  // Aircraft.create(req.body, function(err, aircraft){
  //   if (err || !aircraft) {
  //     return res.status(400).json({error: err, message: 'Error creating aircraft.'});
  //   } else {
  //     console.log(aircraft);
  //     return res.status(200).json({ data: aircraft, message: 'success'});
  //   }
  // });
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
