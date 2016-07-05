'use strict';

let User = require('../models/user.model.js'),
  config     = require('../config'),
  Gallery = require('../models/gallery.model'),
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

//  uplaod aircraft
exports.uploadImage = function(req, res){
  console.log(req.body);
  let formData = req.body;

  async.series({
    generateSlug: function(done){
      let slugId = shortid.generate();
      if(b.modelName) {
        let modelName = formData.general.model.split(" ").join("-");
        formData["slug"] = `${req.user.username}/${modelName}-${slugId}`;
      } else{
        formData["slug"] = `${req.user.username}/${slugId}`;
      }
    },
    uploadImage: function(done){
      let customId = shortid.generate();
      let modelName = formData.general.model.split(" ").join("-");
      if(b.modelName){
        let publicId = `airborne/gallery/${modelName}/${req.user.username}-${modelName}-${customId}`;
      } else {
        let publicId = `airborne/gallery/unknown/${req.user.username}-${customId}`;
      }

      _.forEach(formData.images, function(value, key){
        let customId = shortid.generate();
        let modelName = formData.general.model.split(" ").join("-");
        let publicId = `airborne/aircrafts/${modelName}/${modelName}-${key}-${customId}`;

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
      Gallery.create(formData, function(err, aircraft){
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
};


// Single aircraft
exports.retriveImage = function(req, res){
  return res.status(200).json({ data: req.galleryImage, message: 'success'});
};

// All aircraft
exports.retriveImages = function(req, res){
  Gallery.find({}).exec(function(err, aircraft){
    if (err || !aircraft) {
      return res.status(400).json({message: 'Error finding aircraft.'});
    } else {
      return res.status(200).json({ data: aircraft, message: 'success'});
    }
  });
};


// airCraftId
exports.getBySlug = function(req, res, next, slug){
  Gallery.findOne({slug: slug}).exec(function(err, doc){
    if (err) return next(err);
		if (!doc) return next(new Error('Failed to load aircraft ' + slug));
		req.galleryImage = doc;
		next();
  });
};
