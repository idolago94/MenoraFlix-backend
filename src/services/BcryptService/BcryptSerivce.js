const bcrypt = require('bcrypt');

const hash = password => {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const compare = (value, hashValue) => {
    const check = bcrypt.compareSync(value, hashValue);
    return check;
}


module.exports = { hash, compare };