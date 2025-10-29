import { jwtDecode } from "jwt-decode";
import { apiFetch, getUserInfos } from "../assets/js/api"
import { useEffect, useState } from "react";

export default function Profil() {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [initialUserSets, setInitialUserSets] = useState([]);
    const [userSets, setUserSets] = useState([]);
    const [allSets, setAllSets] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setUserId(decodedToken.userId);
    }, [decodedToken])

    // Récupération des sets de l'utilisateur
    useEffect(() => {
        getUserInfos(decodedToken.userId)
            .then((data) => {
                setUserSets(data.user.sets);
                setInitialUserSets(data.user.sets);
            })
            .catch((e) => console.error(e));
    }, [userId]);


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
        if(!localStorage.getItem('sets')) {
            getPokeSets()
                .then((data) => {
                    const filterArray = data.data.data.filter((set) => set.id === 'swsh1' || set.id === 'dp1' || set.id === 'bw1' || set.id === 'hgss1' || set.id === 'svp');
                    setAllSets(filterArray);
                    localStorage.setItem('sets', JSON.stringify(filterArray));
                })
                .catch((e) => console.error(e));            
        } else {
            setAllSets(JSON.parse(localStorage.getItem('sets')));
        }

    }, []);


    // Modifier le tableau userSet
    const changeUserSetArray = (previousSet, newSet) => {

        setUserSets(prev => {
            const newUserSets = [...prev];
            newUserSets[previousSet] = newSet;
            return newUserSets;
        });

    }


    // Valider le tableau modifier en bdd
    const submitSets = async () => {

        try {
            const data = await apiFetch('http://localhost:3000/api/user/sets/modify', {
                method: 'POST',
                body: JSON.stringify({ userSets, userId })
            });

            setInitialUserSets(userSets);
            
            console.log(data.message);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <section>
            <h1>Profil</h1>
            <div>
                {
                    userSets.length > 0 && (
                        userSets.map((set, index) => (

                    <select name="set-id" key={set} onChange={(e) => changeUserSetArray(index, e.target.value)}>
                        <option value={set}>{set}</option>
                        {
                            allSets.map((additionalSets) => (
                                (userSets.includes(additionalSets.id)) ?

                                    (additionalSets.id === set) ? '' : <option value={additionalSets.id} disabled key={additionalSets.id}>{additionalSets.id}</option> :

                                    <option value={additionalSets.id} key={additionalSets.id}>{additionalSets.id}</option>

                            ))
                        }
                    </select>

                    ))
                    )                
                }
                <button disabled={JSON.stringify(initialUserSets) === JSON.stringify(userSets)} onClick={submitSets}>Valider</button>
            </div>
        </section>
    )
}