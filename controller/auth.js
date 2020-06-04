const { validationResult } = require('express-validator');
const JWT_TOKEN = require('config').get('JWT_TOKEN');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

module.exports = {
	loadUser: async (req, res) => {
		try {
			let user = await User.findById(req.user.id).select('-password');
			res.status(200).json(user);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Server Error **loadUser**' }],
			});
		}
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			// password validation

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(404)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, JWT_TOKEN, (error, token) => {
				if (error) throw error;
				res.status(200).json({ token });
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **Login**' }],
			});
		}
	},

	signUp: async (req, res) => {
		const { name, email, password } = req.body;
		try {
			// Validation form required fields
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			// See if user exsist
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// Return jwtToken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, JWT_TOKEN, (error, token) => {
				if (error) throw error;
				res.status(200).json({ token });
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server in **SignUp**' }],
			});
		}
	},
};
