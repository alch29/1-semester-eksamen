// bcrypt.js
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Function to hash a password
async function hashPassword(plainPassword) {
    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

// Function to compare a plain password with a hashed password
async function comparePassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match; // returns true if match, false if not
    } catch (err) {
        console.error('Error comparing passwords:', err);
        throw err;
    }
}

module.exports = { hashPassword, comparePassword };