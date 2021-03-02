import bodyParser from "body-parser";

import configs from "./../configs/bodyParser.js";

export default function (app) {
    app.use(bodyParser.json(configs.jsonOptions));
    app.use(bodyParser.urlencoded(configs.urlEncodedOptions));
}
