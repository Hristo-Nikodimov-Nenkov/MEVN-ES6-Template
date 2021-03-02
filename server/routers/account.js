import express from "express";

import account from "../controllers/account.js";

const router = express.Router();

router.post("/register", account.registerPost );
router.post("/login", account.loginPost);
router.post("/logout", account.logoutPost);
router.get("/profile", account.profileGet);
router.put("/profile", account.profileUpdate);
router.delete("/profile", account.profileDelete);

export default router;
