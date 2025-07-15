import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    member: {
        type: String,
        enum: ['visitor', 'pending', 'member'],
        default: 'visitor',
    },
    memberSince: {
        type: Date,
        default: null, // will be set when member status changes to 'member'
    },
    class: {
        type: Number,
        enum: [9, 10, 11, 12],
        default: 9
    }
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;