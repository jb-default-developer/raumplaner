import { users } from './users.js';

export function login(username, password) {
    // Sucht den Nutzer mit passender Kombination aus Username und Passwort.
    const user = users.find((u)=> u.username === username && u.password === password);
    
    if (user) {
        // Speichert den eingeloggten Nutzer für spätere Seitenaufrufe.
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return true;
    } else {
        return false;
    }
}