const db = require('../../database/knex.js');

module.exports = {
	find,
	findById,
	add,
	update,
	remove,
};

function find() {
	return db('plants');
}

function findById(id) {
	return db('plants')
		.where({ id })
		.first('id', 'nickname', 'species', 'h2oFrequency', 'image');
}

function add(plant) {
	return db('plants').insert(plant);
}

function update(changes, id) {
	return db('plants')
		.where('id', id)
		.update(changes)
		.then(() => {
			return findById(id);
		});
}

function remove(id) {
	return db('plants').where('id', id).del();
}
