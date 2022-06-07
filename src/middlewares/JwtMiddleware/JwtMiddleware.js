const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UserController = require('../../controllers/UserController');

TOKEN_ERROR_CODE = 401;
TOKEN_ERROR_MSG = 'Authentication error'

class JwtMiddleware {

    generate = (user) => {
        return new Promise(async (resolve) => {
            const { _id, username } = user
            const payload = { _id, username };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            resolve(token);
        })
    }
    
    verify = async (req, res, next) => {
        if (!req.body.token) {
            return res.status(TOKEN_ERROR_CODE).json({ error_message: createError(TOKEN_ERROR_MSG).message })
        }
    
        try {
            const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
            if (decoded.username && decoded.password) {
                req.user = decoded
                return next()
            }
            return res.status(TOKEN_ERROR_CODE).json({ error_message: createError(TOKEN_ERROR_MSG).message })
        } catch (err) {
            return res.status(TOKEN_ERROR_CODE).json({ error_message: createError(TOKEN_ERROR_MSG).message })
        }
    }
}

module.exports = new JwtMiddleware()