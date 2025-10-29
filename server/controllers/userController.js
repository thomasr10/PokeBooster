const User = require("../models/userModel");

exports.getUserInfos = async (req, res) => {

    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(401).json({ message: "Identifiant manquant" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        return res.status(200).json({ user, message: 'Données récupérées avec succès' })

    } catch (e) {
        return res.status(500).json({ message: "Erreur serveur lors de la récupération des données" + e })
    }
}

exports.modifySets = async (req, res) => {

    try {
        const { userSets, userId } = req.body;

        if (!userSets || !userId) {
            return res.status(400).json({ message: "Aucune information sur les sets récupérée"});
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "Utilisateur introuvable"});
        }

        user.sets = userSets;

        await user.save();

        return res.status(200).json({ message: "Sets modifié avec succès"});
        
    } catch (e) {
        throw new Error(`Erreur lors de la modification des sets : ${e}`);
    }
}