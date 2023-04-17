const jwt = require("jsonwebtoken");
const secret_code = process.env.SECRET_CODE || 'secretcode';

const generateToken = (data) => {
    const { id, email, username, role } = data;

    return jwt.sign({
        id, email, username, role
    }, secret_code);
}

const verifyToken = (token) => {
    return jwt.verify(token, secret_code);
}

module.exports = {
    generateToken,
    verifyToken
}