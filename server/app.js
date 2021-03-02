import express from 'express';

const app = express();

//TODO: Extract to server middleware.

const devPort = 9000;
const port = process.env.PORT || devPort;
app.listen(port, ()=> console.log(`Server started on port ${port}.`));
