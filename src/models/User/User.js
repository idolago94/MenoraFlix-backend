const mongoose = require('mongoose')
const { Schema } = mongoose;
// const BcryptMiddleware = require('../Middlewares/bcrypt')

const userSchema = new Schema({
    username: String,
    password: String
});

userSchema.static('findByUserName', async function (userName) {
    return await this.findOne({ userName })
})

userSchema.static('register', async function ({ username, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const userExist = await this.findByUserName(username)
            if (userExist) {
                reject('.שם המשתמש קיים. אנא בחר שם משתמש אחר')
            } else {
                let userData = {
                    username,
                    password//: BcryptMiddleware.hashPassword(data.password)
                }
                console.log(`### -> returnnewPromise -> userData`, userData)
                let newUser = new this(userData)
                const userRes = await newUser.save()
                resolve(userRes)
            }
        } catch (e) {
            reject(e)
        }
    })
})

const User = mongoose.model('User', userSchema);

module.exports = User