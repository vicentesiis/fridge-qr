'use strict';

const Joi = require('joi');

const CreateProductSchema = Joi.object({
    name     : Joi.string().required(),
    quantity : Joi.number().required()
});

module.exports = CreateProductSchema;
