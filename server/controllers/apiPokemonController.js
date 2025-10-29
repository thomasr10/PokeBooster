const dotenv = require('dotenv');
dotenv.config();

exports.getAllSets = async (req, res) => {
    const API_KEY = process.env.API_KEY;
    
    try {
        const apiResponse = await fetch('https://api.pokemontcg.io/v2/sets?page=1&pageSize=150&orderBy=releaseDate', {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        if (!apiResponse.ok) {
            return res.status(400).json({ message: 'Erreur lors de la récupération des données'})
        }

        const data = await apiResponse.json();

        return res.status(200).json({ data });

    } catch(e) {
        throw new Error(e);
    }

}