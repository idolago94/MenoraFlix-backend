const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
// Moddlewares
const JwtMiddleware = require('../middlewares/JwtMiddleware');
const MoviesService = require('../services/MoviesService/MoviesService');

router.post('/Register', JwtMiddleware.verify, async (req, res, next) => {
    try {
        const response = await UserController.addUser(req.user)
        next({ results: response })
    } catch (error) {
        console.log('PostRegister -> error', error);
        return next({ error })
    }
});

router.post('/Login', JwtMiddleware.verify, async (req, res, next) => {
    try {
        const response = await UserController.auth(req.user.username, req.user.password)
        next({ results: response })
    } catch (error) {
        console.log('PostRegister -> error', error);
        return next({ error })
    }
});

router.get('/GetMovies', async (req, res, next) => {
    try {
        const response = await MoviesService.getMovies(req.query)
        next({ results: response })
    } catch (error) {
        console.log('PostRegister -> error', error);
        return next({ error })
    }
})

module.exports = router;
