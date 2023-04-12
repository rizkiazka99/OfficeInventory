const bcrypt = require('bcrypt');
const salt_round = +process.env.SALT_ROUND || 5;

const encryptPassword = (password) => {
    return bcrypt.hashSync(String(password), salt_round);
}

const decryptPassword = (password, hashPassword) => {
    return bcrypt.compareSync(String(password), hashPassword);
}

module.exports = {
    encryptPassword,
    decryptPassword
}