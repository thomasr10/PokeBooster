const User = require('../models/userModel');
const { hashPassword } = require('../utils/passwordHasher');
const { passwordMatch } = require('../utils/passwordMatch')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// INSCRIPTION
exports.registerUser = async (req, res) => {

    try {

        const { pseudo, email, password } = req.body;

        if (!pseudo || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Cette adresse mail est déjà utilisée" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            pseudo,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Utilisateur créé avec succès !" });


    } catch (e) {
        console.error(`Erreur lors de l'inscription de l'utilisateur : ${e}`);
        res.status(500).json(`Erreur serveur : ${e}`);
    }
}

// CONNEXION
exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const user = await User.findOne({ email }).select('+password'); // select password car select: false dans le userModel

        if (!user) {
            return res.status(400).json({ message: "Adresse mail ou mot de passe incorrect" });
        }

        const passwordsMatch = await passwordMatch(password, user.password);

        if (!passwordsMatch) {
            return res.status(400).json({ message: "Adresse mail ou mot de passe incorrect" });
        }

        const token = jwt.sign({
            userId: user._id
        },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            });

        res.status(200).json({token, message: "Connexion réussie"});

    } catch (e) {
        res.status(500).json({ message: "Erreur lors de la connexion"});
        throw e;
    }
}