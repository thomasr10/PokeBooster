import { jwtDecode } from "jwt-decode";
import { apiFetch, getUserInfos } from "../assets/js/api"
import { useEffect, useState } from "react";

export default function Profil() {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [userSets, setUserSets] = useState([]);
    const [allSets, setAllSets] = useState([]);

    const [newSet1, setNewSet1] = useState('');
    const [newSet2, setNewSet2] = useState('');
    const [newSet3, setNewSet3] = useState('');

    // Récupération des sets de l'utilisateur
    useEffect(() => {
        getUserInfos(decodedToken.userId)
            .then((data) => {
                setUserSets(data.user.sets);
            })
            .catch((e) => console.error(e));
    }, [decodedToken.userId]);


    // Récupération de tous les sets
    const getPokeSets = async () => {
        try {
            const data = await apiFetch('http://localhost:3000/api/pokemon/sets', {
                method: 'POST',
            });

            if (!data) {
                throw new Error(`Erreur : ${data.message}`);
            }

            return data;

        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getPokeSets()
            .then((data) => {
                console.log(data.data.data)
                const filterArray = data.data.data.filter((set) => set.id === 'swsh1' || set.id === 'dp1' || set.id === 'bw1' || set.id === 'hgss1' || set.id === 'svp');
                setAllSets(filterArray);
            })
            .catch((e) => console.error(e));
    }, []);

    const submitSets = async () => {
        try {
            const data = await apiFetch('http://localhost:3000/api/user/sets/modify', {
                method: 'POST',
                body: JSON.stringify({})
            });

            return data;

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <section>
            <h1>Profil</h1>
            {
                userSets.length > 0 && (
                    userSets.map((set) => (
                        <div>
                            <select name="set-id" key={set}>
                                <option value={set}>{set}</option>
                                {
                                    allSets.map((additionalSets) => (
                                        (userSets.includes(additionalSets.id)) ?

                                            (additionalSets.id === set) ? '' : <option value={additionalSets.id} disabled key={additionalSets.id}>{additionalSets.id}</option> :

                                            <option value={additionalSets.id} key={additionalSets.id}>{additionalSets.id}</option>

                                    ))
                                }
                            </select>
                            <button onClick={submitSets}>Valider</button>
                        </div>
                    ))
                )
            }
        </section>
    )
}