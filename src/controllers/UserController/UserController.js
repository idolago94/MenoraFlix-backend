const User = require('../../models/User')

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

    auth = async (username, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userRes = await User.auth(username, password)
                resolve(userRes)
            } catch (e) {
                console.log('UserController -> auth -> error', e);
                reject(e)
            }
        })
    }

    getByUsername = async (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userRes = await User.findByUserName(username)
                resolve(userRes)
            } catch (e) {
                console.log('UserController -> getByUsername -> error', e);
                reject(e)
            }
        })
    }
}

module.exports = new UserController()