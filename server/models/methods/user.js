import crypto from "crypto";

const saltLength = 16;
const hashLength = 64;
const hashIterations = 9999;
const hashMethod = 'sha512';

function generateSalt() {
    return crypto.randomBytes(saltLength).toString('hex');
}

function generateHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, hashIterations, hashLength, hashMethod).toString('hex');
}

function setPassword(password) {
    this.passwordSalt = generateSalt();
    this.passwordHash = generateHash(password, this.passwordSalt);
}

function checkPassword(password) {
    const passwordHash = generateHash(password, this.passwordSalt);
    return this.passwordHash === passwordHash;
}

export default {
    setPassword,
    checkPassword
}
