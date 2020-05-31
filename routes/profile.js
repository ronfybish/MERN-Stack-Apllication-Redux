const router = require('express').Router();
const auth=require('../middleware/auth')
const { check } = require('express-validator');

const profileValidator = [
	check('status', 'Status is required').not().isEmpty(),
	check('skills', 'Skills is required').not().isEmpty(),
];

const {
    getProfile,
    createOrUpdateProfile,
    getAllProfiles,
    getProfileByUserId,
    deleteProfile,
} = require('../controller/profile');

router.get('/me',auth,getProfile);
router.get('/',getAllProfiles);
router.delete('/',auth,deleteProfile);
router.get('/user/:user_id',getProfileByUserId);
router.post('/',[auth,profileValidator],createOrUpdateProfile);

module.exports = router;
