'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Searches = new Schema({
   searchTerm: String,
   date: Date
});

module.exports = mongoose.model('Searches', Searches);
