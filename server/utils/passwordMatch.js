const bcrypt = require('bcrypt');

exports.passwordMatch = async (inputPassword, userPassword) => {

    try {
        const passMatch = await bcrypt.compare(inputPassword, userPassword);
        return passMatch;

    } catch (e) {
        console.error(e);
        throw e;
    }
}

