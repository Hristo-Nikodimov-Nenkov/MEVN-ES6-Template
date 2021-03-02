import express from "express";
import path from "path";

import appConfigs from "./../configs/app.js";

export default function (app) {
    const publicPath = appConfigs.staticFilesPath;
    app.use(express.static(path.resolve(publicPath)));
}
