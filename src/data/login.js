import { users } from './users.js';

export function login(username, password) {
    const user = users.find((u)=> u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return true;
    } else {
        return false;
    }
}