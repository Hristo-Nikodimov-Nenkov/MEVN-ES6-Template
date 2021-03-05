import express from "express";

import database from "./middlewares/database.js";

import cors from "./middlewares/cors.js";
import staticFiles from "./middlewares/staticFiles.js";
import bodyParser from "./middlewares/bodyParser.js";
import cookieParser from "./middlewares/cookieParser.js";
import authenticate from "./middlewares/authenticate.js";

import routes from "./middlewares/routes.js";
import server from "./middlewares/server.js";

const app = express();

database();

cors(app);

staticFiles(app);
bodyParser(app);
cookieParser(app);
authenticate(app);

routes(app);
server(app);
