'use strict';

const Glue = require('glue');
const Manifest = require('./manifest');
const DbUrl    = require('./config');
const Mongoose = require('mongoose');

exports.deployment = async (start) => {

    const manifest = Manifest.get('/', process.env);
    const server = await Glue.compose(manifest, { relativeTo: __dirname });

    await server.initialize();

    if (!start) {
        return server;
    }

    Mongoose.connect(DbUrl.uri, { 'useNewUrlParser': true }, (err) => {

        if (err)
            throw err;

        console.info(`Connected to Mongodb - ${DbUrl.uri}`);

    });

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    return server;
};

if (!module.parent) {

    exports.deployment(true);

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}
