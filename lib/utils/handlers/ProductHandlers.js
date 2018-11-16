'use strict';

const Boom    = require('boom');
const Product = require('../../model/Product');

const getById = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.notFound('The product you are searching for, does not exists');

    return req.pre.preVal;
};

const post = (req, res) => {

    const product = new Product();

    product.quantity = req.payload.product.quantity;
    product.name = req.payload.product.name;

    product.save((err, productcb) => {

        if (err)
            throw Boom.badRequest(err);

        return productcb;
    });

    return Object.assign({ 'code': 200, 'message': 'Product Successfully Created' });

};

const put = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No Product Found to Update');

    const id              = req.payload.id;
    const modifiedProduct = req.payload.product;

    Product.findByIdAndUpdate({ '_id': id }, modifiedProduct, { upsert: true }, (err, doc) => {

        if (err)
            Boom.badRequest(err);

        console.log(doc);

    });

    return Object.assign({ 'code': 200, 'message': 'Product Successfully Updated' });

};

const deleteFn = (req, res) => {

    if (req.pre.preVal === null)
        throw Boom.badRequest('No product Found');

    const productId = req.params.id;

    Product.findOneAndRemove(productId, (err) => {

        if (err)
            throw Boom.serverUnavailable('Problem While Deleting, Try Again Later');

    });

    return Object.assign({ 'code': 200, 'message': 'Successfully Deleted' });

};

module.exports = {
    get   : getById,
    post,
    put,
    delete: deleteFn
};
