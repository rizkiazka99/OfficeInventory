const { verifyToken } = require('../helpers/jsonwebtoken');

const authentication = (request, response, next) => {
    console.log('Authentication Initiated!');
    const access_token = request.headers.access_token;

    if (access_token) {
        try {
            let verify_token = verifyToken(access_token);
            request.userData = verify_token;
            next();
        } catch(err) {
            response.status(401).json({
                status: true,
                message: 'Token wasn\'t authenticated'
            });
        }
    } else {
        response.status(401).json({
            status: false,
            message: 'Access Token wasn\'t found'
        })
    }
}

module.exports = {
    authentication
}