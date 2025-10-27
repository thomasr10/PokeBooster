import { useState } from "react"

export default function Register () {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerNewUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/user/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pseudo, email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status} - ${data.message}`);
            }

            alert('Inscription réussie !');

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <section>
            <h1>Inscription</h1>
            <form onSubmit={registerNewUser}>
                <fieldset>
                    <legend>Pseudo</legend>
                    <input type="text" name="pseudo" id="pseudo" placeholder="Votre pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" name="email" id="email" placeholder="Votre adresse email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </fieldset>
                <fieldset>
                    <legend>Mot de passe</legend>
                    <input type="password" name="password" id="password" placeholder="Votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <input type="submit" value="S'inscrire" />
            </form>
        </section>
    )
}