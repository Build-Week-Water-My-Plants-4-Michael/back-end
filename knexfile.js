// module.exports = {
// 	client: 'sqlite3',
// 	useNullAsDefault: true,
// 	connection: {
// 		filename: './database/db.db3',
// 	},
// 	migrations: {
// 		directory: './database/migrations',
// 	},
// 	seeds: {
// 		directory: './database/seeds',
// 	},
// 	pool: {
// 		afterCreate: (conn, done) => {
// 			conn.run('PRAGMA foreign_keys = ON', done);
// 		},
// 	},
// };

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
	// test: {
	// 	client: 'pg',
	// 	connection: 'postgres://candacewilson:postgres@localhost/test-cw-web-store',
	// },
};
