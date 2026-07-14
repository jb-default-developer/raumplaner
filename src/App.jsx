import { useState } from 'react'
import { login } from './data/login.js'
import './App.css'
import Home from './components/Home.jsx'

function App() {
  // Eingaben aus dem Login-Formular.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Login-Status beim Start aus localStorage übernehmen.
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('loggedInUser'));

  // Prüft Zugangsdaten und wechselt bei Erfolg in die Home-Ansicht.
  function handleLogin() {
    const success = login(username, password);

    if (success) {
      setIsLoggedIn(true);
    } else {
      alert("Login failed");
    }
  }
  if (isLoggedIn) {
    return <Home />;
  }

  // Login-Seite, solange kein aktiver Nutzer angemeldet ist.
  return (
    <div className="login-page">
      <header className="login-banner">
        <h1>JOHNNYBYTES RAUMPLANER</h1>
      </header>

      <main className="login-card">
        <div className="inputs">
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
      </main>
    </div>
  )
}

export default App
