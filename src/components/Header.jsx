import '../Header.css';

function Header({ onLogout }) {
    // Zeigt den aktuell angemeldeten Nutzer in der Kopfzeile.
    const user = (() => {
         try {
             const raw = localStorage.getItem('loggedInUser');
             return raw ? JSON.parse(raw) : null;
         } catch {
             return null;
         }
     })();
     
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