const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UserController = require('../../controllers/UserController');

TOKEN_ERROR_CODE = 401;
TOKEN_ERROR_MSG = 'Authentication error'

class JwtMiddleware {
    secret = 'Menora-Flix';

    generate = (user) => {
        return new Promise(async (resolve) => {
            const { _id, username } = user
            const payload = { _id, username };
            const token = jwt.sign(payload, this.secret, { expiresIn: '1h' });
            resolve(token);
        })
    }
    
    verify = async (req, res, next) => {
        const token = req.headers['hstoken'];
        if (!token) {
            return res.status(TOKEN_ERROR_CODE).json({ error_message: createError(TOKEN_ERROR_MSG).message })
        }
    
        try {
            const decoded = jwt.verify(token, this.secret)
            if (decoded.username) {
                const user = await UserController.getByUsername(decoded.username)
                if (decoded._id == user._id) {
                    req.user = user
                    return next()
                }
            }
            return res.status(TOKEN_ERROR_CODE).json({ error_message: createError(TOKEN_ERROR_MSG).message })
        } catch (err) {
            return res.status(TOKEN_ERROR_CODE).json({ error_message: createError(TOKEN_ERROR_MSG).message })
        }
    }
}

module.exports = new JwtMiddleware()