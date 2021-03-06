import cookiesConfigs from "../configs/cookies.js";
import {validationResult} from "express-validator";
import account from "../services/account.js";
import security from "../services/security.js";

async function registerPost(req, res) {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    const created = await account.register(req.body);
    res.status(200).send(created);
}

async function loginPost(req, res) {
    const user = await account.login(req.body);
    if (!user) {
        res.status(400).send("Invalid credentials.");
        return;
    }

    const token = security.generateToken(user);
    res.cookie(cookiesConfigs.authenticationCookieName, token, cookiesConfigs.options);

    delete user["id"];
    res.status(200).send(user);
}

async function logoutPost(req, res) {
    res.clearCookie(cookiesConfigs.authenticationCookieName);
    res.status(200).send("Logout successful.");
}

async function profileGet(req, res) {
    res.status(200).send({
        username: req.user.username,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber
    });
}

async function profileUpdate(req, res) {
    res.status(200).send("PUT: /Account/Profile");
}

async function profileDelete(req, res) {
    res.status(200).send("DELETE: /Account/Profile");
}

export default {
    registerPost,
    loginPost,
    logoutPost,
    profileGet,
    profileUpdate,
    profileDelete
}
