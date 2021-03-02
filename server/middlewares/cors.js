import cors from "cors";

import appConfigs from "./../configs/app.js";

const origin = appConfigs.baseUrl;
const corsOptions = {
    origin,
    optionsSuccessStatus: 200
};

export default function (app){
    app.use(cors(corsOptions));
}
