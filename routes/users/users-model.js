const db = require('../../database/knex');
// const knex = require('./knex');
const bcrypt = require('bcryptjs');

module.exports = {
	findUser,
	userById,
	findUserBy,
	addUser,
};

function findUser() {
	return db('users').select('id', 'username', 'phoneNumber');
}

function userById(id) {
	return db('users').where('id', id).first();
}

function findUserBy(filter) {
	return db('users')
		.select('id', 'username', 'phoneNumber', 'password')
		.where(filter);
}

async function addUser(user) {
	// hash the password with a time complexity of 14
	user.password = await bcrypt.hash(user.password, 14);

	const [id] = await db('users')
		.insert(user)
		.returning('id', 'username', 'password', 'phoneNumber');
	return userById(id);
}
