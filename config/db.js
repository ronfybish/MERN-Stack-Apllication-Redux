const mongoose = require('mongoose');
// const MONGO_DB_URI = require('config').get('MONGO_DB_URI');
const dotenv=require('dotenv').config()

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});

		console.log('MongoDB Connected!!');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
