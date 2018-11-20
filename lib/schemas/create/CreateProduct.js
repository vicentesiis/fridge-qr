'use strict';

const Joi = require('joi');

const CreateProductSchema = Joi.object({
    id       : Joi.string(),
    name     : Joi.string().required(),
    quantity : Joi.number().required()
});

module.exports = CreateProductSchema;
