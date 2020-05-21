const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const plantsRouter = require('../routes/plants/plants-router');

const server = express();

server.use(helmet());

server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
server.use(express.json());

server.use('/plants', plantsRouter);

server.get('/', (req, res, next) => {
	res.json({
		message: 'Welcome to our API',
	});
});

module.exports = server;
