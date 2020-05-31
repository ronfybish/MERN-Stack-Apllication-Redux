const router = require('express').Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

const {
	addPost,
	getAllPosts,
	getPostById,
	deletePost,
	likePost,
	unlikePost,
	addComment,
	deleteComment,
} = require('../controller/posts');

const postValidator = [check('text', 'Text is required').not().isEmpty()];
const commentValidator = [check('text', 'Text is required').not().isEmpty()];

router.post('/', [auth, postValidator], addPost);
router.get('/', auth, getAllPosts);
router.get('/:post_id', auth, getPostById);
router.delete('/:post_id', auth, deletePost);
router.put('/like/:post_id', auth, likePost);
router.put('/unlike/:post_id', auth, unlikePost);
router.post('/comment/:post_id', [auth, commentValidator], addComment);
router.delete('/comment/:post_id/:comment_id', auth, deleteComment);
module.exports = router;
