exports.seed = function (knex) {
	return knex('plants')
		.truncate()
		.then(function () {
			return knex('plants').insert([
				{
					nickname: 'Peace Lily',
					species: 'Spathiphyllum',
					h2oFrequency: '2 weeks',
					image: 'prettyphoto.url',
				},
				{
					nickname: 'Cactus',
					species: 'Caryophyllales',
					h2oFrequency: '4 weeks',
					image: 'prettyphoto.url',
				},
				{
					nickname: 'Amaryllis',
					species: 'Amaryllidaceae',
					h2oFrequency: '8 – 10 weeks',
					image: 'prettyphoto.url',
				},
			]);
		});
};
