import {authenticate} from "../services/security.js";

export default function (app) {
    app.use(authenticate());
}
