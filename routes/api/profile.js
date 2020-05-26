const router = require('express').Router();
// @Route /api/profile

const {} = require('../../controller/profile');

router.get('/', (req, res) => res.send('profile Route'));
module.exports = router;
