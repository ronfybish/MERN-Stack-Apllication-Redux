const express = require('express');
const connectDB = require('./config/db');
const dotenv=require('dotenv').config()
const path = require('path');
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({extended: false}));

// Define Routes
app.use('/api/profile', require('./routes/profile'));
app.use('/api/auth', require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
