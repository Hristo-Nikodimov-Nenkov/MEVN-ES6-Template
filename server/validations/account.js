import {body} from "express-validator";
import User from "../models/User.js";
import {usernameLength, passwordLength} from "../models/schemas/user.js";

const usernameValidation =
    body("username")
        .toLowerCase()
        .custom(value => {
            return User.usernameExists(value)
                .then(exists => {
                    if (exists) {
                        return Promise.reject('Username already registered.');
                    }
                })
        })
        .exists()
        .withMessage("Username is required.")
        .bail()
        .isLength(usernameLength)
        .withMessage(`Username must have between ${usernameLength.min} and ${usernameLength.max} symbols.`);

const emailValidation =
    body("email")
        .toLowerCase()
        .custom(value => {
            return User.emailExists(value)
                .then(exists => {
                    if (exists) {
                        return Promise.reject('E-Mail already registered.');
                    }
                })
        })
        .exists()
        .withMessage("E-Mail is required.")
        .bail()
        .isEmail()
        .withMessage("Invalid E-Mail.");

const passwordValidation =
    body("password")
        .exists()
        .withMessage("Password is required.")
        .bail()
        .isLength(passwordLength)
        .withMessage(`Password must be from ${passwordLength.min} to ${passwordLength.max} symbols long.`)
        .bail()
        .matches(/[a-z]+/)
        .withMessage("Password must contain small letter")
        .matches(/[A-Z]+/)
        .withMessage("Password must contain capital letter")
        .matches(/[0-9]+/)
        .withMessage("Password must contain digit")
        .matches(/[^a-zA-Z\d\s:]+/)
        .withMessage("Password must contain non-alphanumeric symbol.");

const confirmPasswordValidation =
    body("confirmPassword")
        .exists()
        .withMessage("Confirm password is required.")
        .bail()
        .custom((val, {req}) => {
            if (val !== req.body.password) {
                throw new Error("Passwords do NOT match.");
            } else {
                return val;
            }
        });

const currentPasswordValidation =
    body("oldPassword")
        .exists()
        .withMessage("Current password is required.")
        .bail()
        .custom((val, {req}) => {
            const user = User.findById(req.user.id);

            if (!user.checkPassword(val)) {
                throw new Error("Current password is NOT valid.");
            } else {
                return val;
            }
        });

const phoneNumberValidation =
    body("phoneNumber")
        .toLowerCase();

const loginUsernameValidation =
    body("username")
        .exists()
        .withMessage("Username is required.");

const loginPasswordValidation =
    body("password")
        .exists()
        .withMessage("Password is required.");

export const registerModelValidation = [
    usernameValidation,
    emailValidation,
    passwordValidation,
    confirmPasswordValidation
]

export const loginModelValidation = [
    loginUsernameValidation,
    loginPasswordValidation
]

export const updateProfileValidation = [
    usernameValidation,
    emailValidation,
    phoneNumberValidation
]

export const changePasswordValidation = [
    currentPasswordValidation,
    passwordValidation,
    confirmPasswordValidation
]

export default {
    registerModelValidation,
    loginModelValidation,
    updateProfileValidation,
    changePasswordValidation
}
