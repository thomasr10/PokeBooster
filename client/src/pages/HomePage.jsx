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

    useEffect(() => {
        getUserInfos(decodedToken.userId)
        .then((data) => {
            setLevel(data.user.level);
            setPseudo(data.user.pseudo);
            setXp(data.user.xp);
            setPieces(data.user.pieces);
        })
        .catch((e) => console.error(e));
    }, [token]);

    return (
        <main>
            <h1>Test</h1>
            <p>{ pseudo }</p>
            <p>{ xp }</p>
            <p>{ pieces }</p>
            <p>{ level }</p>
        </main>
    )
}