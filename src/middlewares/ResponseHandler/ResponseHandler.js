const createError = require('http-errors');

const DEFAULT_ERROR_CODE = 400

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
        const error = createError(json.error)
        // set locals, only providing error in development
        res.locals.message = error.message;
        res.locals.error = req.app.get('env') === 'development' ? error : {};

        // send the error
        res.status(error.status || DEFAULT_ERROR_CODE);
        res.json({ error_message: error.message })
    } else { // Success (200)
        res.json(json)
    }
};

module.exports = ResponseHandler