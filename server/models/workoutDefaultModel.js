const mongoose = require('mongoose');

// Create the schema
const workoutDefaultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
        trim: true,
    },
    type: {
        type: String,
        required: [true, 'Please enter a workout'],
        trim: true,
    },
    muscle: {
        type: String,
        required: [true, 'Please enter a muscle'],  
        trim: true,
    },
    equipment: {
        type: String,
        required: [true, 'Please enter a equipment'],
        trim: true,
    },
    instructions: {
        type: String,
        required: false,
        trim: true,
    }   
},
{
    timestamps: true

});

// Create the model
const WorkoutDefault = mongoose.model('WorkoutDefault', workoutDefaultSchema);

// Export the model
module.exports = WorkoutDefault;