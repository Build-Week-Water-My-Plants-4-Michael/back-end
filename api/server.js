const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const plantsRouter = require('../routes/plants/plants-router');
const userRouter = require('../routes/users/users-router');
const auth = require('../routes/users/auth-middleware');

const server = express();

server.use(helmet());
server.use(cookieParser());

server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
server.use(express.json());

server.use('/auth', userRouter);
server.use('/plants', auth, plantsRouter);

server.get('/', (req, res, next) => {
	res.json({
		message: 'Welcome to our API',
	});
});

module.exports = server;
