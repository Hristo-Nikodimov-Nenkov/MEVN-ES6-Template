import path from "path";
import appConfigs from "./../configs/app.js";

function fallback(req, res){
    res.sendFile(path.join(appConfigs.staticFilesPath, "index.html"));
}

export default function (app){
    //TODO: Add routers here.
    app.use(/.*/,fallback);
}
