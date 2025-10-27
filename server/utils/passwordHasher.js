const bcrypt = require('bcrypt');
const saltRound = 10;

exports.hashPassword = async (clearPassword) => {

    try {
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(clearPassword, salt);

        return hashedPassword;

    } catch (e) {
        console.error(`Erreur lors du hachage du mot de passe : ${e}`);
        throw e;
    }
};