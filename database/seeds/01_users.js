exports.seed = function (knex) {
	return knex('users')
		.truncate()
		.then(function () {
			return knex('users').insert([
				{
					username: 'john',
					password: 'abc123',
					phoneNumber: '555-867-5309',
				},
				{
					username: 'jane',
					password: 'abc123',
					phoneNumber: '555-867-5309',
				},
				{
					username: 'alice',
					password: 'abc123',
					phoneNumber: '555-867-5309',
				},
				{
					username: 'joe',
					password: 'abc123',
					phoneNumber: '555-867-5309',
				},
				{
					username: 'Jen',
					password: 'abc123',
					phoneNumber: '555-867-5309',
				},
			]);
		});
};
