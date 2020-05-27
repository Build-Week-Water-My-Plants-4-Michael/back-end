module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://candacewilson:postgres@localhost/waterPlants',
		migrations: {
			directory: './database/migrations',
			tableName: 'waterPlants',
		},
		seeds: { directory: './database/seeds' },
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './database/migrations',
			tableName: 'waterPlants',
		},
		seeds: { directory: './database/seeds' },
	},
	test: {
		client: 'pg',
		connection: 'postgres://candacewilson:postgres@localhost/test-waterPlants',
		migrations: {
			directory: './database/migrations',
			tableName: 'waterPlants',
		},
		seeds: { directory: './database/seeds' },
	},
};
