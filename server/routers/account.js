import express from "express";

import {
    registerModelValidation,
    loginModelValidation,
    updateProfileValidation,
    changePasswordValidation
} from "../validations/account.js";

import {isAuthenticated} from "../services/security.js";

import account from "../controllers/account.js";

const router = express.Router();

router.post("/register", registerModelValidation, account.registerPost);
router.post("/login",loginModelValidation, account.loginPost);
router.post("/logout", isAuthenticated, account.logoutPost);
router.get("/profile", isAuthenticated, account.profileGet);
router.put("/profile", isAuthenticated, ...updateProfileValidation, account.profileUpdate);
router.post("/profile/password", isAuthenticated, ...changePasswordValidation, account.passwordUpdate)
router.delete("/profile", isAuthenticated, account.profileDelete);

export default router;
