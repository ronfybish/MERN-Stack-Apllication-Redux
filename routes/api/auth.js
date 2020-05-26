const router = require('express').Router();
const auth=require('../../middleware/auth')


const {
    getAuthUser
} = require('../../controller/auth');

router.get('/',auth ,getAuthUser);

module.exports = router;
