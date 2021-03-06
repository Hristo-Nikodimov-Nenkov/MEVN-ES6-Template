import appConfigs from "./app.js";

export const defaultEnvironment = "development";

const configs = {
    "development": {
        secret: "My JWT signing secret.",
        options: {
            issuer: `http://localhost:${appConfigs.port}`,
            audience: `http://localhost:${appConfigs.port}`,
            expiresIn: "7d"
        },

    },
    "production": {
        secret: process.env.JWT_SECRET,
        options: {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    }
}

export default configs[process.env.NODE_ENV] || configs[defaultEnvironment];
