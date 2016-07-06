'use strict';
var mongoose = require('mongoose');

let AirCraftSchema = mongoose.Schema({
  meta:{
    slug: String,
    favCount: {type: Number, default: 0}
  },
  general: {
    model:                String,
    description:          String,
    year:                 Number,
    maidenFlight:         Number,
    series:               String,
    productionStatus:     String,
    category:             String,
    airCraftManufacturers: [String],
    roles:                 [String],
    industries:             [String],
    aircraftTypes:         [String]
  },
  interior: {
    crew:       Number,
    passengers: Number,
    bootSpace:  Number
  },
  dimensions: {
    length:   Number,
    height:   Number,
    wingSpan: Number,
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
    rear:     {image: String, source: String},
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
