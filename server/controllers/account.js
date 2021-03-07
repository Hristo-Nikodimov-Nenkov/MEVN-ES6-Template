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
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

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
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    try {
        const updated = await account.update(req.user.id, req.body);
        if (!updated) {
            res.status(400).send("Profile was NOT updated.");
            return;
        }

        res.status(200).send(updated);
    } catch (err) {
        console.log(err);
    }
}

async function passwordUpdate(req, res) {
    res.status(200).send("POST: /Account/Profile/Password");
}

async function profileDelete(req, res) {
    if (req.body.verificationToken && security.checkDeleteToken(req.body.verificationToken, req.user.id)) {
        const deleted = await account.remove(req.user.id);
        if (deleted) {
            res.status(200).send(`User with Username: ${req.user.username} and E-Mail: ${req.user.email} - DELETED!`);
            return;
        } else {
            res.status(400).send(`User with Username: ${req.user.username} and E-Mail: ${req.user.email} - IS NOT DELETED!`);
            return;
        }
    }

    const deleteToken = security.generateDeleteToken({
        id: req.user.id
    });
    res.status(200).send(deleteToken);
}

export default {
    registerPost,
    loginPost,
    logoutPost,
    profileGet,
    profileUpdate,
    passwordUpdate,
    profileDelete
}
