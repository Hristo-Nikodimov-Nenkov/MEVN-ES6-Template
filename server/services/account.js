import User from "../models/User.js";

export async function register(model) {
    const user = new User({
        username: model.username,
        email: model.email,
        phoneNumber: model.phoneNumber || ""
    });

    user.setPassword(model.password);
    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber
    }
}

export default {
    register
}
