const dotenv = require('dotenv');
dotenv.config();
const API_KEY = process.env.API_KEY;

exports.getAllSets = async (req, res) => {

    try {
        const apiResponse = await fetch('https://api.pokemontcg.io/v2/sets?page=1&pageSize=150&orderBy=releaseDate', {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        if (!apiResponse.ok) {
            return res.status(400).json({ message: 'Erreur lors de la récupération des données' })
        }

        const data = await apiResponse.json();

        return res.status(200).json({ data });

    } catch (e) {
        throw new Error(e);
    }

}

exports.getBoosters = async (req, res) => {
    try {
        const { sets } = req.body;

        if (!sets) {
            return res.status(400).json({ message: 'Aucune donnée reçue dans la requête' });
        }

        const urls = [];
        sets.map((set) => {
            urls.push(`https://api.pokemontcg.io/v2/sets/${set}`);
        })

        const arrayData = [];

        await Promise.all(urls.map(async (url) => {
            console.log(url);
            const apiResponse = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Api-Key': API_KEY
                }
            });
            const data = await apiResponse.json();
            arrayData.push(data);
        }));

        return res.status(200).json({ arrayData, message: 'Données récupérées avec succès' });

    } catch (e) {
        return res.status(500).json({ message: `Erreur survenue lors de l'appel à l'API : ${e}` });
    }
}