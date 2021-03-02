async function registerPost(req, res) {
    res.status(200).send("POST: /Account/Register");
}

async function loginPost(req, res) {
    res.status(200).send("POST: /Account/Login");
}

async function logoutPost(req, res) {
    res.status(200).send("POST: /Account/Logout");
}

async function profileGet(req, res) {
    res.status(200).send("GET: /Account/Profile");
}

async function profileUpdate(req, res) {
    res.status(200).send("PUT: /Account/Profile");
}

async function profileDelete(req, res) {
    res.status(200).send("DELETE: /Account/Profile");
}

export default {
    registerPost,
    loginPost,
    logoutPost,
    profileGet,
    profileUpdate,
    profileDelete
}
