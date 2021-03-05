import mongoose from "mongoose";
import {usernameLength} from "../../validations/account.js";

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
