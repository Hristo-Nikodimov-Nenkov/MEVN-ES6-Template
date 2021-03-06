import mongoose from "mongoose";

export const usernameLength = {
    min: 6,
    max: 30
}

export const passwordLength = {
    min: 8,
    max: 40
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: usernameLength.min,
        maxlength: usernameLength.max
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    roles: {
        type: Array,
        required: true
    },
    passwordSalt: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true
    }
});

export default userSchema;
