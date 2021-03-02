import path from "path";

import appConfigs from "./../configs/app.js";

import accountRouter from "../routers/account.js";
function fallback(req, res){
    res.sendFile(path.join(appConfigs.staticFilesPath, "index.html"));
}

export default function (app){
    app.use("/account", accountRouter);

    //TODO: Add routers here.

    app.use(/.*/,fallback);
}
