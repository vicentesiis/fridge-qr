'use strict';

const Joi = require('joi');

const getProductSchema = Joi.object().keys({
    id          : Joi.string(),
    name        : Joi.string().required(),
    quantity    : Joi.number().required()
});

module.exports = {
    getProductSchema
};
