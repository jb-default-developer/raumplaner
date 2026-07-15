import { getUsers, saveUser } from './users.js';

// Einfache Prüfung ob die E-Mail das Format name@domain.tld hat.
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Prüft ob der Name aus mindestens Vor- und Nachnamen besteht.
function isValidUsername(username) {
    return /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*\s+[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*(?:\s+[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*)*$/.test(username);
}

export function login(email, password) {
    // Sucht den Nutzer mit passender Kombination aus E-Mail und Passwort.
    const user = getUsers().find((u) => u.email === email && u.password === password);
    
    if (user) {
        return { success: true, user: { username: user.username } };
    } else {
        return { success: false };
    }
}

// Legt einen neuen Nutzer an, wenn alle Felder gültig und die E-Mail noch nicht vergeben ist.
export function signup(username, email, password) {
    // Eingaben bereinigen bevor validiert wird.
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
        return { success: false, message: 'Bitte alle Felder ausfüllen.' };
    }

    if (!isValidUsername(trimmedUsername)) {
        return { success: false, message: 'Bitte Vor- und Nachnamen eingeben.' };
    }

    if (!isValidEmail(trimmedEmail)) {
        return { success: false, message: 'Bitte eine gültige E-Mail-Adresse eingeben.' };
    }

    const existingUser = getUsers().find((user) => user.email.toLowerCase() === trimmedEmail);

    if (existingUser) {
        return { success: false, message: 'Diese E-Mail ist bereits registriert.' };
    }

    const newUser = {
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
    };

    saveUser(newUser);
    return { success: true, user: { username: newUser.username } };
}