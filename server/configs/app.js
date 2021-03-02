const devPort = 9000;
const port = process.env.PORT || devPort;

const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

import path from "path";
const publicPath = "./server/public";
const staticFilesPath = path.resolve(publicPath);

export default {
    baseUrl,
    port,
    staticFilesPath
}
