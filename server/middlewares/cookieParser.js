import cookieParser from "cookie-parser";
import configs from "../configs/cookies.js";

export default function (app) {
    app.use(cookieParser(configs.secret, configs.options));
}
