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
export function authenticate() {
    return function (req, res, next) {
        const authenticationCookie = req.cookies[authenticationCookieName] || req.signedCookies[authenticationCookieName];
        console.log(`AuthenticationCookie: ${authenticationCookie}`);
        if (authenticationCookie) {
            //TODO: Change to JWT verify.
            req.user = JSON.parse(authenticationCookie)
        }

        next();
    }
}

export default {
    isAuthenticated,
    isAuthenticatedAs,
    authenticate
}
