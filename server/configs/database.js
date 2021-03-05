export const defaultDbName = "mevn-es6-template";
export const defaultEnvironment = "development";
export const defaultConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

const connections = {
    development: {
        host: "localhost",
        port: 27015,
        dbName: defaultDbName
    },
    production: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
}

function generateConnectionString(connection) {
    let connectionString = "mongodb://";
    if (connection.username || connection.password) {
        connectionString += `${connection.username}:${connection.password}@`;
    }
    connectionString += `${connection.host}:${connection.port}/${connection.dbName}`;

    return connectionString;
}

export function getConnection(env = defaultEnvironment){
    let connection = connections[env];

    if (!connection) {
        `Database connection for ${env} environment NOT FOUND - Default environment connection will be used instead.`;
        connection = connections[defaultEnvironment];
    }

    return connection;
}
export function getConnectionString(env = defaultEnvironment) {
    return generateConnectionString(getConnection(env));
}

export default {
    defaultDbName,
    defaultEnvironment,
    defaultConnectionOptions,
    getConnection,
    getConnectionString
}
