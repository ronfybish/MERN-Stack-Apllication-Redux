const router = require('express').Router();
const { check } = require('express-validator');


const { signIn } = require('../../controller/users');

router.post(
	'/',
	[
		check('name', 'Name is Required').not().isEmpty(),
		check('email', 'Please Include avalid email').isEmail(),
		check('password','please enter a password with 6 or more characters').isLength({ min: 6 }),
	],
	signIn
);

module.exports = router;
