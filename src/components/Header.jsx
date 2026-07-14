import '../Header.css';

function Header({ onLogout }) {
    // Zeigt den aktuell angemeldeten Nutzer in der Kopfzeile.
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    return (
        <div className="header">
            <h1>Raumplaner</h1>
            <div className="header-right">
                <p>angemeldet als : {user ? user.username : 'Gast'}</p>
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;