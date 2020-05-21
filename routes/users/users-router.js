const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./users-model');
const router = require('express').Router();

const authenticate = require('./auth-middleware');
const plantsRoute = require('../plants/plants-router');
router.use('/plants', authenticate(), plantsRoute);

router.post('/register', async (req, res, next) => {
	try {
		const { username } = req.body;
		const user = await Users.findUserBy({ username }).first();

		if (user) {
			return res.status(409).json({
				message: 'Username is already taken',
			});
		}

		res.status(201).json(await Users.addUser(req.body));
	} catch (err) {
		next(err);
	}
});

router.post('/login', validateUsername, async (req, res, next) => {
	const authError = {
		message: 'Invalid Credentials',
	};

	try {
		const user = await Users.findUserBy({
			username: req.body.username,
		}).first();
		if (!user) {
			return res.status(401).json(authError);
		}

		const passwordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!passwordValid) {
			return res.status(401).json(authError);
		}

		const tokenPayload = {
			userId: user.id,
			username: user.username,
			phoneNumber: user.phoneNumber,
		};

		const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
		res.cookie('token', token);

		res.json({
			message: `Welcome, ${user.username}!`,
			token: token,
		});
	} catch (err) {
		next(err);
	}
});

async function validateUsername(req, res, next) {
	try {
		const { username } = req.body;
		const user = await Users.findUserBy({ username });
		if (!user) {
			return res.status(404).json({
				message: 'Not Found',
				validation: ['User not found'],
				data: {},
			});
		}
		next();
	} catch (err) {
		next(err);
	}
}

module.exports = router;
