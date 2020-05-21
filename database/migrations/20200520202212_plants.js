exports.up = async function (knex) {
	await knex.schema.createTable('plants', (tbl) => {
		tbl.increments();
		tbl.string('nickname').notNull().unique;
		tbl.string('species').notNull();
		tbl.string('h2oFrequency').notNull();
		tbl.string('image');
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('plants');
};
