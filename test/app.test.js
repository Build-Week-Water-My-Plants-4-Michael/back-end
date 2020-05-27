const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../database/knex');

const app = require('../api/server');
const fixtures = require('./fixtures');

function createLoginToken(server, loginDetails, done) {
	request(server)
		.post('/login')
		.send(loginDetails)
		.end(function (error, response) {
			if (error) {
				throw error;
			}
			let loginToken = response.body.token;
			done(loginToken);
		});
}

// LOGIN //
describe('Login API', function () {
	it('Should success if credential is valid', (done) => {
		request(app)
			.post('/login')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send({ username: 'john', password: 'abc123' })
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(function (response) {
				expect(response.body).not.to.be.empty;
				expect(response.body).to.be.an('object');
			});
		done();
	});
});

// REGISTER //

describe('Registers a new user', function () {
	it('Should success if credential is valid', (done) => {
		request(app)
			.post('/register')
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.send({
				username: 'newuser',
				phoneNumber: '555-555-5555',
				password: 'abc123',
			})
			.expect(200)
			.expect('Content-Type', /json/)
			.expect(function (response) {
				expect(response.body).not.to.be.empty;
				expect(response.body).to.be.an('object');
			});
		done();
	});
});

// PLANTS //

describe('Plants', () => {
	before((done) => {
		// run migrations
		knex.migrate
			.latest()
			.then(() => {
				//run seeds
				return knex.seed.run();
			})
			.then(() => done());
	});

	// GET all plants
	it('Lists all Plants', (done) => {
		request(app)
			.get('/plants')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(401)
			.then((response) => {
				expect(response.body).to.be.a('array');
				expect({ message: 'You shall not pass!' }).to.be.a('array');
			});
		done();
	});

	// GET a plant by id
	it('Show one record by id', (done) => {
		request(app)
			.get('/plants/2')
			.set('Accept', 'application/json')

			.expect('Content-Type', /json/)
			.expect(401)
			.then((response) => {
				expect(response.body).to.be.a('object');
				expect(response.body).to.deep.equal(fixtures.plants[1]);
			});
		done();
	});

	// ADD a new plant
	it('Adds a new plant', (done) => {
		request(app)
			.post('/plants')
			.set('Accept', 'application/json')
			.send({
				nickname: 'new plant',
				species: 'flower',
				h2oFrequency: '2 weeks',
				image: 'prettyphoto.url',
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).to.be.a('object');
				expect(response.body).to.deep.equal(fixtures.plants[1]);
			});
		done();
	});
	// UPDATE a plant
	it('Updates new plant', (done) => {
		request(app)
			.put('/plants/2')
			.set('Accept', 'application/json')
			.send({
				nickname: 'updated plant',
				species: 'flower',
				h2oFrequency: '2 weeks',
				image: 'prettyphoto.url',
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('object');
				expect(response.body).to.deep.equal(fixtures.plants[1]);
			});
		done();
	});

	// DELETE plant
	it('Deletes plant', (done) => {
		request(app).delete('/plants/2').expect(200);
		done();
	});
});
