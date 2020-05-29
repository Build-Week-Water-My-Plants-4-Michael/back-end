process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../database/knex');
var assert = require('assert');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

const app = require('../api/server');
const fixtures = require('./fixtures');
var loginController = require('./login.controller');

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

	const assert = require('assert');
	const promiseMe = require('mocha-promise-me');

	it('should test that a promise rejects', () => {
		let promise = new Promise((resolve, reject) =>
			reject(Error('You shall not pass!'))
		);
		let assertion = (error) =>
			assert.equal('You shall not pass!', error.message);
		return promiseMe.thatYouReject(promise, assertion);
	});

	// GET all plants
	it('Lists all Plants', async function () {
		let promise = new Promise((resolve, reject) =>
			request(app)
				.get('/plants')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(401)

				.then(() => {
					expect({ message: 'You shall not pass!' }).to.be.a('object');
				})
		);
	});

	// GET a plant by id
	it('Show one record by id', (done) => {
		request(app)
			.get('/plants/2')
			.set('Accept', 'application/json')

			.expect('Content-Type', /json/)
			.expect(401);

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
			.expect(200);

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
			.expect(200);

		done();
	});

	// DELETE plant
	it('Deletes plant', (done) => {
		request(app).delete('/plants/2').expect(200);
		done();
	});
});

// TEST USER LOGIN

chai.use(chaiAsPromised).should();
beforeEach('Setting up the userList', function () {
	console.log('beforeEach');
	loginController.loadUserList(['john', 'jane']);
});
describe('LoginController', function () {
	describe('isValidUserId', function () {
		it('should return true if valid user id', function () {
			var isValid = loginController.isValidUserId('john');
			//assert.equal(isValid, true);
			expect(isValid).to.be.true;
		});

		it('should return false if invalid user id', function () {
			var isValid = loginController.isValidUserId('jane1');
			//assert.equal(isValid, false);
			isValid.should.equal(false);
		});
	});
});

// TEST VALID USER ID
describe('isValidUserIdAsync', function () {
	it('should return true if valid user id', function (done) {
		loginController.isValidUserIdAsync('john', function (isValid) {
			//assert.equal(isValid, true);
			isValid.should.equal(true);
			done();
		});
	});
});

describe('isAuthorizedPromise', function () {
	it('should return true if valid user id', function () {
		return loginController.isAuthorizedPromise('jane').should.eventually.be
			.true;
	});
});

beforeEach('Setting up the userList', function () {
	console.log('beforeEach');
	loginController.loadUserList(['jane', 'john']);
	//throw {error: 'Thrwoing Error to fail'}
});

describe('LoginController', function () {
	describe('isValidUserId', function () {
		it('should return true if valid user id', function () {
			var isValid = loginController.isValidUserId('john');
			assert.equal(isValid, true);
		});

		it('should return false if invalid user id', function () {
			var isValid = loginController.isValidUserId('jack');
			assert.equal(isValid, false);
		});
	});

	describe('isValidUserIdAsync', function () {
		it('should return true if valid user id', function (done) {
			loginController.isValidUserIdAsync('jane', function (isValid) {
				assert.equal(isValid, true);
				done();
			});
		});
	});
});
