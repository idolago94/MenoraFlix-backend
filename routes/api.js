const express = require('express');
const router = express.Router();
// Moddlewares
// const TokenMiddleware = require('../Middlewares/Token')
// const FileMiddleware = require('../Middlewares/file')

router.get('/Register', async (req, res, next) => {
    try {
        next({ results: 'success' })
    } catch (error) {
        console.log('PostRegister -> error', error);
        return next({ error })
    }
});


module.exports = router;
