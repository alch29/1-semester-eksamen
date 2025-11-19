const bcrypt = require('bcrypt');

const password = 'gfgDemoPassword';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(hash);
});

const hashedPassword =
    "$2b$10$iGg/9uZhbLVhl.BkFnfNoO0OGnLuweX.URICnzXIePPz5uCFrj7uu";
const plainPassword = "gfg1122";

bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    if (result) {
        console.log("Password is correct!");
    } else {
        console.log("Password is incorrect!");
    }
});