export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 401) {
        logout();
        throw new Error("Session expirée. Veuillez vous reconnecter");
    }

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return response.json();
}

export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

export async function getUserInfos(id) {

    try {
        const data = await apiFetch(`http://localhost:3000/api/user/${id}`, {
            method: 'GET',
        });

        if (!data) {
            throw new Error('Aucune donnée reçue');
        }

        return data;

    } catch (e) {
        throw new Error("Erreur lors de la récupération des informations de l'utilisateur : " + e);
    }
}