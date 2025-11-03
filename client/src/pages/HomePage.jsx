import { use, useEffect, useState } from 'react'
import { apiFetch, getUserInfos } from '../assets/js/api'
import { jwtDecode } from 'jwt-decode';

export default function HomePage() {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const [level, setLevel] = useState(null);
    const [pseudo, setPseudo] = useState('');
    const [xp, setXp] = useState(null);
    const [pieces, setPieces] = useState(null);
    const [sets, setSets] = useState([]);

    const [arrayBoosters, setArrayBoosters] = useState([]);

    useEffect(() => {
        getUserInfos(decodedToken.userId)
            .then((data) => {
                setLevel(data.user.level);
                setPseudo(data.user.pseudo);
                setXp(data.user.xp);
                setPieces(data.user.pieces);
                setSets(data.user.sets);
            })
            .catch((e) => console.error(e));
    }, [token]);

    const getBoosters = async () => {
        try {
            const data = apiFetch('http://localhost:3000/api/pokemon/boosters', {
                method: 'POST',
                body: JSON.stringify({ sets })
            });

            return data;
        } catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {
        if (!localStorage.getItem('arrayBoosters') && !sets.length <= 0) {
            getBoosters()
                .then((data) => {
                    console.log(data);
                    setArrayBoosters(data.arrayData);
                    localStorage.setItem('arrayBoosters', JSON.stringify(data.arrayData));
                })
                .catch((e) => console.error(e));
        } else {
            setArrayBoosters(JSON.parse(localStorage.getItem('arrayBoosters')));
        }
    }, [sets]);

    useEffect(() => {
        console.log(arrayBoosters)
    }, [])

    return (
        <main>
            <h1>Test</h1>
            <p>{pseudo}</p>
            <p>{xp}</p>
            <p>{pieces}</p>
            <p>{level}</p>
            <div className="boosters-container">
                {
                    arrayBoosters.map((booster, index) => (
                        <div className="booster" key={index}>
                            <p>{ booster.data.name }</p>
                            <img src={ booster.data.images.logo } alt={`Logo de la série ${booster.data.name}`} />
                            <button>Ouvrir</button>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}