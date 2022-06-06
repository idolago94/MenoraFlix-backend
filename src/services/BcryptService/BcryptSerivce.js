const bcrypt = require('bcrypt');

class BcryptService {
    hash = password => {
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    
    compare = (value, hashValue) => {
        const check = bcrypt.compareSync(value, hashValue);
        return check;
    }
}




module.exports = new BcryptService();