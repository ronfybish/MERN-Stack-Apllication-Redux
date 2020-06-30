const jwt = require('jsonwebtoken');
// const JWT_TOKEN = require('config').get('JWT_TOKEN');
const dotenv=require('dotenv')
module.exports = (req, res, next) => {
	//Get token from header
	const token = req.header('auth-token');
	if (!token) {
		return res.status(401).json({ msg: 'No token,authorization denied' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_TOKEN);
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
