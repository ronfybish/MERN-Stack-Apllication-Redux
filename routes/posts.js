const router = require('express').Router();
// @Route /api/posts

const {} = require('../controller/posts');

router.get('/', (req, res) => res.send('Post Route'));
module.exports = router;
