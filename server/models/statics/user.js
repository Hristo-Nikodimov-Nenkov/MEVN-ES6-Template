async function usernameExists(username) {
    return await this.findOne({username: username}).exec();
}

async function emailExists(email) {
    return await this.findOne({email: email}).exec();
}

async function usernameOrEmailExists(identifier) {
    let user = await this.findOne({username: identifier}).exec();
    if (!user) {
        user = await this.findOne({email: identifier}).exec();
    }

    return !!user;
}

export default {
    usernameExists,
    emailExists,
    usernameOrEmailExists
}
