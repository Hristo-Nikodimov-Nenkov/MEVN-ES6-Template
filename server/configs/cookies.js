export const authenticationCookieName = "AuthCookie";
export const defaultEnvironment = "development";

const configs = {
    "development": {
        secret: "My cookies signing secret.",
        options: {
            httpOnly: true,
            secure: false,
        },
        authenticationCookieName
    },
    "production": {
        secret: process.env.COOKIES_SECRET,
        options: {
            httpOnly: true,
            secure: process.env.COOKIES_SECURE || false
        },
        authenticationCookieName
    }
}

export default configs[process.env.NODE_ENV] || configs[defaultEnvironment];
