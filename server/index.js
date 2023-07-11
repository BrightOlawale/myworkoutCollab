// Description: Main server file

// Dependencies
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const errorHandler = require('./middleware/errorMiddleware');
const config = require('./config/connectDB');
const userRoute = require('./routes/userRoute');
const workoutRoute = require('./routes/workoutRoute');
const helpers = require('./helpers');
const initializer = require('./initWorkout');

// Instantiate the application
const app = express();

// Port declaration
const PORT = process.env.PORT || 3000;

// For parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Service endpoint get methods
app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api/users', userRoute);
app.use('/api/workouts', workoutRoute);

// Middleware to handle error;
app.use(errorHandler);

// Start App function, display PROMPT in purple
const startApp = async () => {
    try{
        await config.connectDB();
        // Check if default category exist
        const categoryExist = await helpers.checkDefaultCategory();
        // If default category does not exist
        if (!categoryExist) {
            // Create default categories
            await initializer.createDefaultCategories();
        }
        app.listen(PORT, () => {
            console.log(`\x1b[35m%s\x1b[0m`, `SERVER: Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error(`\x1b[31m%s\x1b[0m`, `SERVER: ${error.message}`);
        process.exit(1);
    }
}

startApp();
