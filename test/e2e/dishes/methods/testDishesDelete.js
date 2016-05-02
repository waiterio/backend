'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('delete a single dish', function(done) {
		server.get('db').db.run('INSERT INTO dishes (name, price) VALUES(?, ?)', [ 'spaghetti', 2399 ], function() {
			const dishId = this.lastID;

			Request(server)
				.delete('/api/dishes/' + dishId)
				.expect('Access-Control-Allow-Origin', '*')
				.expect('Content-Type', /json/)
				.expect(200)
				.expect({ status: 200, message: 'success' })
				.end(function(error) {
					server.get('db').db.run('DELETE FROM dishes WHERE id = ?', [ dishId ], function() {
						if (error) return done(error);
						done();
					});
				});
		});
	});

	it('fail when id is not a number', function(done) {
		Request(server)
			.delete('/api/dishes/abc')
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for id (\'NaN\') is not of type number' }, done);
	});
};
