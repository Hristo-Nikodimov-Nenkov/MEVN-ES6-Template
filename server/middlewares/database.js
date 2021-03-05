import mongoose from "mongoose";
import dbConfigs from "../configs/database.js";

export default function () {
    const dbConnection = dbConfigs.getConnection();

    mongoose.connect(
        dbConnection.connectionString,
        dbConfigs.defaultConnectionOptions)
        .then(() => {
            console.log(`Database ${dbConnection.dbName} - Connected.`);
            import("../models/User.js");
        })
        .catch(err => console.log(err));
}
