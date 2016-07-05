'use strict';
var mongoose = require('mongoose');

let GallerySchema = mongoose.Schema({
  airCraftId: { type: String, ref: 'Aircraft' },
  userId: { type: String, ref: 'User'},
  slug: String,
  tags: [String],
  imageUrl: String,
  caption: String,
  uploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);
