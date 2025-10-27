import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Erreur HTPP : ${response.status} - ${data.message}`);
            }

            localStorage.setItem('token', data.token);
            navigate('/');

        } catch(e) {
            console.error(e);
        }
    }

    return (
        <section>
            <h1>Connexion</h1>
            <form onSubmit={login}>
                <fieldset>
                    <legend>Pseudo</legend>
                    <input type="text" name="email" id="email" placeholder="Votre adresse mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <legend>Mot de passe</legend>
                    <input type="password" name="password" id="password" placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <input type="submit" value="Se connecter" />
            </form>
        </section>
    )
}