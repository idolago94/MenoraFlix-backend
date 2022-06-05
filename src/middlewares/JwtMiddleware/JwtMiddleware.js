const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UserController = require('../../controllers/UserController');

const secret = 'Menora-Flix';
const TOKEN_ERROR_CODE = 401;
const TOKEN_ERROR_MSG = 'Authentication error'

const generate = (user) => {
    return new Promise(async (resolve) => {
        const { _id, username } = user
        const payload = { _id, username };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        resolve(token);
    })
}

const verify = async (req, res, next) => {
    const token = req.headers['hstoken'];
    if (!token) {
        return res.status(TOKEN_ERROR_CODE).json({ error_message: createError(TOKEN_ERROR_MSG).message })
    }
    
    try {
        const decoded = jwt.verify(token, secret)
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

module.exports = { generate, verify };