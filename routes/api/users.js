const router = require('express').Router();
// @Route /api/users

const {} = require('../../controller/users');

router.get('/', (req, res) => res.send('User Route'));

module.exports = router;
