const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const plantsRouter = require('../routes/plants/plants-router');
const userRouter = require('../routes/users/users-router');
const auth = require('../routes/users/auth-middleware');

const server = express();

server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

server.use(cors());
server.use(express.json());

server.use('/', userRouter);
server.use('/plants', auth, plantsRouter);

server.get('/', (req, res, next) => {
	res.json({
		message: 'Welcome to our API',
	});
});

module.exports = server;
