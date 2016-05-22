'use strict';

// NPM Modules
const BodyParser = require('body-parser');
const Compression = require('compression');
const CrossOrigin = require('cors');
const Express = require('express');

// Custom Modules
const Log = require('./common/logging.js');
const RequestValidation = require('./auth/validateRequest');
const Settings = require('./settings.js');
const Database = require('./common/sqlite.js')({ database: Settings.database, environment: Settings.environment });

const server = Express();

// Setting Global Objects
server.set('db', Database);
server.set('log', Log);

// Middleware
server.use(BodyParser.json());
server.use(Compression({}));
server.use(CrossOrigin());
server.use('/api/*', RequestValidation);

// Authentication Routes
server.use('/auth', require('./auth/router.js'));

// Resource related Routes
server.use('/api/dishes', require('./api/dishes/router.js'));
server.use('/api/orders', require('./api/orders/router.js'));
server.use('/api/users', require('./api/users/router.js'));
server.use('/api/categories', require('./api/categories/router.js'));

// Default Route
server.use(function(req, res) {
	res.status(404).json({ status: 404, message: 'Not found' });
});

server.listen(process.env.PORT || Settings.port, function() {
	Log.info('server started in %s environment', Settings.environment, { server: this.address() });
});

module.exports = server;
