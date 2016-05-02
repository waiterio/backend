'use strict';

const Request = require('supertest');
const Assert = require('chai').assert;

module.exports = function() {
	let server;

	beforeEach(function() {
		server = require('../../helpers/mockServer.js');
	});

	it('update a dish', function(done) {
		const postData = { name: 'pizza quattro formaggi', price: 980 };

		server.get('db').db.run('INSERT INTO dishes (name, price) VALUES(?, ?)', [ 'pizza with cheese', 920 ], function() {
			let dishId = this.lastID;

			Request(server)
				.put('/api/dishes/' + dishId)
				.send(postData)
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

	it('allow when data is missing', function(done) {
		Request(server)
			.put('/api/dishes/1')
			.send()
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('fail when data is invalid', function(done) {
		Request(server)
			.put('/api/dishes/1')
			.send({ price: '1299' })
			.expect('Access-Control-Allow-Origin', '*')
			.expect('Content-Type', /json/)
			.expect(422)
			.expect({ status: 422, message: 'input for price (\'1299\') is not of type number' }, done);
	});
};
