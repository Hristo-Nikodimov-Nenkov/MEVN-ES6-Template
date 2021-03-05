import mongoose from "mongoose";

import userSchema from "./schemas/user.js";
import methods from "./methods/user.js";
import statics from "./statics/user.js";

for (const methodName in methods) {
    userSchema.methods[methodName] = methods[methodName];
}

for (const staticName in statics) {
    userSchema.statics[staticName] = statics[staticName];
}

const User = mongoose.model("User", userSchema, "users");

export default User;
