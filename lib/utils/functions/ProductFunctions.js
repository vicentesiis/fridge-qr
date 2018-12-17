'use strict';

const Product = require('../../model/Product');

const getProduct = (req, res) => {

    const productName = req.payload.product.name;
    console.log(productName);


    return Product.find({ 'name': productName }, (_err, _project) => {});
};

const getProducts = (req, res) => Product.find({}, (_err, _projects) => {});

const deleteProductPre = (req, res) => Product.findById({ '_id': (Object.keys(req.params).length) > 0 ? req.params.id : req.payload.product.id }, (_err, _user) => {});

module.exports = {
    getProducts,
    getProduct,
    deleteProductPre
};
