const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
// Moddlewares
// const TokenMiddleware = require('../Middlewares/Token')

router.post('/Register', async (req, res, next) => {
    try {
        const response = await UserController.addUser(req.body)
        next({ results: response })
    } catch (error) {
        console.log('PostRegister -> error', error);
        return next({ error })
    }
});

router.post('/Login', async (req, res, next) => {
    try {
        const response = await UserController.auth(req.body.username, req.body.password)
        next({ results: response })
    } catch (error) {
        console.log('PostRegister -> error', error);
        return next({ error })
    }
});

module.exports = router;
