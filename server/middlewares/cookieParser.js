import cookieParser from "cookie-parser";
import {authenticate} from "../services/security.js";
import configs from "../configs/cookies.js";

export default function (app) {
    app.use(cookieParser(configs.secret, configs.options));
    app.use(authenticate());
}
