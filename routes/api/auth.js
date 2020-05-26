const router = require('express').Router();
// @Route /api/auth

const {} = require('../../controller/auth');

router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;
