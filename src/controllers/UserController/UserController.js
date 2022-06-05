const User = require('../../Models/User')
// const BcryptMiddleware = require('../../Middlewares/bcrypt/bcrypt')

class UserController {
    addUser = async (userDetails) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userRes = await User.register(userDetails)
                resolve(userRes)
            } catch (e) {
                console.log('UserController -> addUser -> error', e);
                reject(e)
            }

        })
    }
}

module.exports = new UserController()