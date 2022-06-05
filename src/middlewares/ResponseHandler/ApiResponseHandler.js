const createError = require('http-errors');
const JwtMiddleware = require('../JwtMiddleware')

const DEFAULT_ERROR_CODE = 400
const NON_TOKEN_REQUIRE_REQUEST = ['/api/Register']

async function ResponseHandler(json, req, res, next) {
    // res.set('Access-Control-Expose-Headers', '*')

    if (json == 'Error') { // Server Error
        const error = createError('אירעה שגיאה. אנא נסה שנית מאוחר יותר.')
        // set locals, only providing error in development
        res.locals.message = error.message;

        // send the error
        res.status(error.status || DEFAULT_ERROR_CODE);
        res.json({ error_message: error.message })
    } else if (json.error) { // Specific Error
        const error = createError(DEFAULT_ERROR_CODE, json.error)
        // set locals, only providing error in development
        res.locals.message = error.message;
        res.locals.error = req.app.get('env') === 'development' ? error : {};

        // send the error
        res.status(error.status);
        res.json({ error_message: error.message })
    } else { // Success (200)
        if (!NON_TOKEN_REQUIRE_REQUEST.includes(req.url)) {
            res.set('HsToken', await JwtMiddleware.generate(req.user || json.results))
        }
        res.json(json)
    }
};

module.exports = ResponseHandler