import mongoose from 'mongoose'
import { AppConfig } from './config/connectDB'

// Instantiate AppConfig and initialize
const appConfig = new AppConfig()
appConfig.initialize()

// Access MongoDB URL and server port
const mongoUrl = appConfig.getMongoUrl()
const serverPort = appConfig.getServerPort() // Added

// Connect to MongoDB cluster
mongoose
	.connect(mongoUrl) // Use new connection options
	.then(() => {
		console.log('MongoDB connected successfully')
		// Start your server or perform any other operations here
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error)
	})

// Example: Start a server
// const express = require('express');
// const app = express();

// app.listen(serverPort, () => {
//     console.log(`Server is running on port ${serverPort}`);
// });
