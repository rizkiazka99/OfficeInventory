const jwt = require("jsonwebtoken");
const secret_code = process.env.SECRET_CODE || 'secretcode';

const generateToken = (data) => {
    const { id, email, username, image_name, image_type, image_data, role } = data;

    return jwt.sign({
        id, email, username, image_name, image_type, image_data, role
    }, secret_code)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret_code);
}

module.exports = {
    generateToken,
    verifyToken
}