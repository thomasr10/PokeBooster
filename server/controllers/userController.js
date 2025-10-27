const User = require("../models/userModel");

exports.getUserInfos = async (req, res) => {

    try {
        const userId  = req.params.id;

        if (!userId) {
            return res.status(401).json({ message: "Identifiant manquant"});
        }
    
        const user = await User.findById(userId);
    
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé"});
        }

        return res.status(200).json({user, message: 'Données récupérées avec succès'})

    } catch (e) {
        return res.status(500).json({ message: "Erreur serveur lors de la récupération des données" + e})
    }
}