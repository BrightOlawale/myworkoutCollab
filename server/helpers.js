const axios = require('axios');
const dotenv = require('dotenv').config();
const workoutCategory = require('./models/workoutDefaultModel');
const UserWorkout = require('./models/userWorkoutModel');


// Generate conrtaier
const helpers = {};

// @desc    Get beginner categories
helpers.getCategories = async (category) => {
    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?difficulty=${category}`, {
            headers: {
                'X-Api-Key':  process.env.NINJA_API_KEY
            }
        })
        const data =  response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};

// @desc    Check database if default category exist
helpers.checkDefaultCategory = async () => {
    try {
        const defaultCategory = await workoutCategory.find({});
        if (defaultCategory.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
};

// @desc    Function to delete all user workout
helpers.deleteUserWorkouts = async (userId) => {
    try {
        const userWorkouts = await UserWorkout.find({ user: userId });
        if (userWorkouts.length > 0) {
            for (const workout of userWorkouts) {
                await UserWorkout.findByIdAndDelete(workout._id);
            }
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = helpers;

