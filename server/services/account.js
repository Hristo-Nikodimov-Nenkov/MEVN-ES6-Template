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
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber
    }
}

export async function login(model) {
    try {
        const user = await User.findByUsernameOrEmail(model.username);
        if (!user || !user.checkPassword(model.password)) {
            return null;
        }

        return {
            id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber
        }
    } catch (err) {
        console.log(err);
    }
}

export async function remove(id) {
    const deleted = await User.findByIdAndRemove(id, {useFindAndModify: false}).exec();
    return !!deleted;
}

export default {
    register,
    login,
    remove
}
