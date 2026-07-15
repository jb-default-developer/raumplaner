// Einfache "Demo-Nutzerliste" für den lokalen Login.
export const seedUsers = [
    {
        username: "Maya Kilbertus",
        email: "maya.kilbertus@example.com",
        password: "password123",
    },
    {
        username: "Thorsten Wesseler",
        email: "thorsten.wesseler@example.com",
        password: "password456",
    },
    {
        username: "Timo Schlößer",
        email: "timo.schloesser@example.com",
        password: "password789",
    },
    {
        username: "Tobias Schürpel",
        email: "tobias.schuerpel@example.com",
        password: "password457",
    },
    {
        username: "Joaquin Marcher",
        email: "joaquin.marcher@example.com",
        password: "password",
    },
    {
        username: "Platzhalter Person",
        email: "platzhalter.person@example.com",
        password: "password785",
    },
];

// localStorage-Key für selbst registrierte Nutzer.
const storedUsersKey = 'registeredUsers';

// Gibt Seed-Nutzer und registrierte Nutzer zusammen zurück.
export function getUsers() {
    const storedUsers = localStorage.getItem(storedUsersKey);

    if (!storedUsers) {
        return [...seedUsers];
    }

    try {
        const parsedUsers = JSON.parse(storedUsers);

        if (Array.isArray(parsedUsers)) {
            return [...seedUsers, ...parsedUsers];
        }
    } catch {
        localStorage.removeItem(storedUsersKey);
    }

    return [...seedUsers];
}

// Fügt einen neuen Nutzer zur Liste der registrierten Nutzer im localStorage hinzu.
export function saveUser(user) {
    const currentUsers = JSON.parse(localStorage.getItem(storedUsersKey) || '[]');
    localStorage.setItem(storedUsersKey, JSON.stringify([...currentUsers, user]));
}