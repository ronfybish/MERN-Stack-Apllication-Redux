const Post = require('../models/Post');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { validationResult } = require('express-validator');

module.exports = {
	addPost: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();

			res.status(200).json(post);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **addPost**' }],
			});
		}
	},

	getAllPosts: async (req, res) => {
		try {
			const posts = await Post.find().sort({ date: -1 });
			res.status(200).json(posts);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **getAllPosts**' }],
			});
		}
	},

	getPostById: async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) {
				return res.status(404).json({ msg: 'Post not Found' });
			}
			res.status(200).json(post);
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'Post not Found' });
			}
			res.status(500).json({
				errors: [{ msg: 'Error Server **getPostById**' }],
			});
		}
	},

	deletePost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);

			if (post.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'User not authorized' });
			}
			await post.remove();
			res.status(200).json({ msg: 'Post removed' });
		} catch (error) {
			console.error(error.message);
			if (error.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'Post not Found' });
			}
			res.status(500).json({
				errors: [{ msg: 'Error Server **deletePost**' }],
			});
		}
	},

	likePost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);

			if (post.likes.some(like => like.user.toString() === req.user.id)) {
				return res.status(400).json({ msg: 'Post already liked' });
			}

			post.likes.unshift({ user: req.user.id });

			await post.save();

			return res.json(post.likes);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **likePost**' }],
			});
		}
	},

	unlikePost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);

			// Check if the post has not yet been liked
			if (
				!post.likes.some(like => like.user.toString() === req.user.id)
			) {
				return res
					.status(400)
					.json({ msg: 'Post has not yet been liked' });
			}

			// remove the like
			post.likes = post.likes.filter(
				({ user }) => user.toString() !== req.user.id
			);

			await post.save();

			return res.json(post.likes);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **unlikePost**' }],
			});
		}
	},

	addComment: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req.params.post_id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();

			res.status(200).json(post.comments);
		} catch (error) {
			console.error(error.message);
			res.status(500).json({
				errors: [{ msg: 'Error Server **addComment**' }],
			});
		}
	},

	deleteComment: async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);

			// Pull out comment
			const comment = post.comments.find(
				comment => comment.id === req.params.comment_id
			);
			// Make sure comment exists
			if (!comment) {
				return res.status(404).json({ msg: 'Comment does not exist' });
			}
			// Check user
			if (comment.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'User not authorized' });
			}

			post.comments = post.comments.filter(
				({ id }) => id !== req.params.comment_id
			);

			await post.save();

			return res.status(200).json(post.comments);
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({
				errors: [{ msg: 'Error Server **deleteComment**' }],
			});
		}
	},
};
