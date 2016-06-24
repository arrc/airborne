'use strict';
var mongoose = require('mongoose');

let AirCraftSchema = mongoose.Schema({
  general: {
    description:          String,
    category:             [String],
    aircraftManufacturer: [String],
    year:                 Number,
    maidenFlight:         Number,
    series:               String,
    model:                String,
    productionStatus:     String,
    role:                 [String],
    industry:             [String],
    type:                 [String]
  },
  interior: {
    crew:       Number,
    passengers: Number,
    bootSpace:  Number
  },
  dimensions: {
    length:   Number,
    height:   Number,
    wingspan: Number,
    wingArea: Number
  },
  weight: {
    emptyWeight:      Number,
    grossWeight:      Number,
    maxTakeOffWeight: Number,
    maxLandingWeight: Number,
    maxPayload:       Number,
    fullFuelPayload:  Number
  },
  performance: {
    maxCruiseSpeed: Number,
    stallSpeed:     Number,
    range:          Number,
    serviceCeiling: Number,
    maxClimbRate:   Number,
    maxSpeedLimit:  Number,
    takeOff: {
      takeOffDistance: Number,
      groundRoll:      Number
    },
    landing: {
      landingDistance: Number,
      groundRoll:      Number
    }
  },
  powerPlant: {
    engineManufacturers: String,
    engineModel:         String,
    powerOutput:         Number,
    thrust:              Number,
    engineType:          String
  },
  images: {
    front:    {image: String, source: String},
    back:     {image: String, source: String},
    left:     {image: String, source: String},
    right:    {image: String, source: String},
    top:      {image: String, source: String},
    bottom:   {image: String, source: String},
    takeOff:  {image: String, source: String},
    airborne: {image: String, source: String},
    landing:  {image: String, source: String},
  }
});


module.exports = mongoose.model('AirCraft', AirCraftSchema);
