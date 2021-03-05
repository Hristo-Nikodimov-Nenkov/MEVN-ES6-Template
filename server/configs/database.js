export const defaultDbName = "mevn-es6-template";
export const defaultEnvironment = "development";

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

export function getConnectionString(env = defaultEnvironment) {
    if (!env) {
        env = process.env.NODE_ENV;
    }

    const connection = connections[env];

    if (!connection) {
        `Database connection for ${env} environment NOT FOUND - Default environment connection will be used instead.`;
    }

    return generateConnectionString(connections[env] || connections[defaultEnvironment]);
}

export default {
    defaultDbName,
    defaultEnvironment,
    getConnectionString
}
