import '../styles/Header.css';
import { useAuth } from '../context/useAuth.js';

// Oberer Seitenbereich mit Nutzerinfo und Logout-Button.
function Header({ onLogout }) {
    const { user } = useAuth();
     
    return (
        <div className="header">
            <h1>Raumplaner</h1>
            <div className="header-right">
                {/* Zeigt den aktuell angemeldeten Nutzer aus dem Auth-Kontext. */}
                <p>angemeldet als : {user ? user.username : 'Gast'}</p>
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;