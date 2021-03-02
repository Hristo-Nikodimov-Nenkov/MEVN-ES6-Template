import appConfigs from './../configs/app.js';

export default function (app) {
    const port = appConfigs.port;
    app.listen(port, () => console.log(`Server started on port ${port}.`));
}
