'use strict';

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const ProductModel = new Schema({
    name        : { type: String, required: true },
    quantity    : { type: Number, required: true }
});

module.exports = Mongoose.model('Project', ProductModel);
