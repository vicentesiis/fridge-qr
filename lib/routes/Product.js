'use strict';

const Joi                 = require('joi');
const AuxFns              = require('../utils/functions/ProductFunctions');
const Handler             = require('../utils/handlers/ProductHandlers');
const ErrorHandler        = require('../utils/utils/ErrorHandler');
const ResponseSchema      = require('../schemas/get/GetProduct');
const CreateProductSchema = require('../schemas/create/CreateProduct');

module.exports = [
    {
        // Get Product
        method: 'GET',
        path  : '/product/{id}',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for Specific Product',
            notes      : 'Get the specified Product',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getProduct, assign: 'preVal' }
            ],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The Product ID to Search')
                },
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchema.getProductSchema.label('Product')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Get All the Products
        method: 'GET',
        path  : '/product',
        config: {
            handler    : Handler.get,
            description: 'GET Endpoint for all the Products',
            notes      : 'Get all the Products',
            tags       : ['api'],
            pre        : [
                { method: AuxFns.getProducts, assign: 'preVal' }
            ],
            validate   : {
                failAction: ErrorHandler
            },
            plugins    : {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : ResponseSchema.getProductSchema.label('Product')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Create Product
        method: 'POST',
        path  : `/product`,
        config: {
            handler: Handler.post,
            description: 'POST Endpoint for Specific Product',
            notes      : 'Create a Product',
            tags       : ['api'],
            validate   : {
                payload: {
                    product: CreateProductSchema
                },
                failAction: ErrorHandler
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : Joi.object().keys({
                                code   : Joi.number().example(200),
                                message: Joi.string(),
                                _id    : Joi.string()
                            }).label('Product')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Modify Product
        method: 'PUT',
        path  : `/product`,
        config: {
            handler: Handler.put,
            pre    : [
                { method: AuxFns.deleteProductPre, assign: 'preVal' }
            ],
            description: 'PUT Endpoint for Specific Product',
            notes      : 'Edit the specific Product',
            tags       : ['api'],
            validate   : {
                payload: {
                    product: CreateProductSchema
                },
                failAction: ErrorHandler
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : Joi.object().keys({
                                code   : Joi.number().example(200),
                                message: Joi.string()
                            }).label('Product')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    },
    {
        // Delete Product
        method: 'DELETE',
        path  : `/product/{id}`,
        config: {
            handler: Handler.delete,
            pre    : [
                { method: AuxFns.deleteProductPre, assign: 'preVal' }
            ],
            description: 'DELETE Endpoint for Specific Product',
            notes      : 'Delete the Specific Product',
            tags       : ['api'],
            validate   : {
                params: {
                    id: Joi.string()
                        .required()
                        .description('The Product ID for the Product to be deleted')
                },
                failAction: ErrorHandler
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema'     : Joi.object().keys({
                                code   : Joi.number().example(200),
                                message: Joi.string()
                            }).label('Product')
                        },
                        '400': { 'description': 'BadRequest' },
                        '404': { 'description': 'NotFound' },
                        '500': { 'description': 'ServerError' }
                    }
                }
            }
        }
    }
];
