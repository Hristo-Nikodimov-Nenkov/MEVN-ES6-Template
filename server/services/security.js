export function isAuthenticated(req, res, next) {
    if (!req.user) {
        res.status(401).send("Only authenticated users can access this url.");
        return;
    }

    next();
}

export function isAuthenticatedAs(role = "User") {
    return function (req, res, next) {
        if (!req.user.roles.contains(role)) {
            res.status(401).send(`User must be authenticated as ${role} to access this url.`);
            return;
        }

        next();
    }
}

import jwt from "jsonwebtoken";
import jwtConfigs from "../configs/jwt.js";
import {authenticationCookieName} from "../configs/cookies.js";

export function generateToken(user) {
    try {
        return jwt.sign(user, jwtConfigs.secret, jwtConfigs.options);
    } catch (err) {
        console.log(err);
    }
}

export function generateDeleteToken(user) {
    try {
        const deleteOptions = jwtConfigs.options;
        deleteOptions.expiresIn = "120s";
        return jwt.sign(user, jwtConfigs.secret, deleteOptions);
    } catch (err) {
        console.log(err);
    }
}

export function checkDeleteToken(token, userId) {
    try {
        const decoded = jwt.verify(token, jwtConfigs.secret, jwtConfigs.options);

        return !!decoded && decoded.id === userId;
    } catch (err) {
        console.log(err);
    }
}

import User from "../models/User.js";

export function authenticate() {
    return async function (req, res, next) {
        const authenticationCookie = req.cookies[authenticationCookieName] || req.signedCookies[authenticationCookieName];
        if (authenticationCookie) {
            try {
                const decoded = jwt.verify(authenticationCookie, jwtConfigs.secret, jwtConfigs.options);
                if (decoded && await User.usernameExists(decoded.username)) {
                    req.user = decoded;
                }
            } catch (err) {
                console.log(err);
            }
        }

        next();
    }
}

export default {
    isAuthenticated,
    isAuthenticatedAs,
    generateToken,
    generateDeleteToken,
    checkDeleteToken,
    authenticate
}
