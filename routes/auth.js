const router = require('express').Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const signUpValidator = [
	check('name', 'Name is Required').not().isEmpty(),
	check('email', 'Please Include avalid email').isEmail(),
	check(
		'password',
		'please enter a password with 6 or more characters'
	).isLength({ min: 6 }),
];
const logInValidator = [
	check('email', 'Please Include avalid email').isEmail(),
	check('password', 'Password is required').exists(),
];

const { getUser, signUp, login } = require('../controller/auth');

router.post('/signup', signUpValidator, signUp);
router.post('/login', logInValidator, login);
router.get('/', auth, getUser);

module.exports = router;
