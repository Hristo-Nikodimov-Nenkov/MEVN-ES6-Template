import express from "express";

import cors from "./middlewares/cors.js";
import staticFiles from "./middlewares/staticFiles.js";
import bodyParser from "./middlewares/bodyParser.js";
import cookieParser from "./middlewares/cookieParser.js";

import routes from "./middlewares/routes.js";

import server from "./middlewares/server.js";

const app = express();
cors(app);

staticFiles(app);
bodyParser(app);

cookieParser(app);

routes(app);
server(app);
