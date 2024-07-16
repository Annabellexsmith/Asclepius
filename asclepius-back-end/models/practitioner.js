const mongoose = require('mongoose');
const User = require('./user');
const Review = require('./review');

const practitionerSchema = new mongoose.Schema({

  name: { type: String, required: true, maxlength: 255 },
  bio: { type: String, required: true },
  clinic_coords: { lon: Number, lat: Number },
  clinic_address: { type: String, required: true },
  clinic_phone_number: {type: Number, required: true},
  website: {type: String, required: true}, 
  services: [{ type: String }],
  image_url: [{ type: String }],

  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }

},
  { timestamps: true }
);

const Practitioner = mongoose.model('Practitioner', practitionerSchema);

module.exports = Practitioner;