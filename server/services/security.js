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


import {authenticationCookieName} from "../configs/cookies.js";
import jwt from "jsonwebtoken";
import jwtConfigs from "../configs/jwt.js";

export function authenticate() {
    return function (req, res, next) {
        const authenticationCookie = req.cookies[authenticationCookieName] || req.signedCookies[authenticationCookieName];
        if (authenticationCookie) {
            const decoded = jwt.verify(authenticationCookie, jwtConfigs.secret, jwtConfigs.options);
            if (decoded) {
                const payload = decoded.split(".")[1];
                try {
                    req.user = JSON.parse(new Buffer(payload, 'base64').toString("utf-8"));
                } catch (err) {
                    console.log(err);
                }
            }
        }

        next();
    }
}

export default {
    isAuthenticated,
    isAuthenticatedAs,
    authenticate
}
