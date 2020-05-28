const router = require('express').Router();
const auth=require('../middleware/auth')
const { check } = require('express-validator');

const profileValidator = [
	check('status', 'Status is required').not().isEmpty(),
	check('skils', 'Skils is required').not().isEmpty(),
];

const {
    getProfile,
    createOrUpdateProfile
} = require('../controller/profile');

router.get('/me',auth,getProfile);
router.post('/',[auth,profileValidator],createOrUpdateProfile);

module.exports = router;
