import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authenticateUser, signup } from '../data/login.js'
import { useAuth } from '../context/useAuth.js'
import '../styles/App.css'
import loadingVideo from '../assets/loading.mp4'

// Login-/Signup-Seite inkl. kurzer Ladeanimation vor Weiterleitung.
export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Eingaben aus dem Login-Formular.
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pendingUser, setPendingUser] = useState(null)

  // Prüft Zugangsdaten und startet bei Erfolg die Ladeanimation.
  function handleLogin() {
    setErrorMessage('')
    const result = authenticateUser(email, password)

    if (result.success) {
      setPendingUser(result.user)
      setIsLoading(true)
    } else {
      alert('Login failed')
      setErrorMessage('Login fehlgeschlagen.')
    }
  }

  // Registriert einen neuen Account und startet die Ladeanimation.
  function handleSignup() {
    setErrorMessage('')
    const result = signup(username, email, password)

    if (result.success) {
      setPendingUser(result.user)
      setIsLoading(true)
    } else {
      setErrorMessage(result.message)
    }
  }

  // Wechselt zwischen Login- und Registrierungsansicht.
  function handleModeToggle() {
    setErrorMessage('')
    setIsSignup((currentValue) => !currentValue)
  }

  function handleLoadingFinished() {
    if (!pendingUser) {
      setIsLoading(false)
      return
    }

    login(pendingUser)
    setPendingUser(null)
    setIsLoading(false)
    navigate('/')
  }

  return (
    <div className="login-page">
      {/* Branding-Kopfbereich. */}
      <header className="login-banner">
        <h1>JOHNNYBYTES RAUMPLANER</h1>
      </header>

      <main className="login-card">
        {/* Formularfelder für Login oder Registrierung. */}
        <div className="inputs">
          {isSignup && (
            <label className="field-group">
              <span>Name</span>
              <input
                placeholder="Max Mustermann"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          )}
          <label className="field-group">
            <span>E-Mail</span>
            <input
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="field-group">
            <span>Password</span>
            <input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        {errorMessage && <p className="auth-message">{errorMessage}</p>}

        {/* Primäre Aktionen: anmelden/registrieren + Moduswechsel. */}
        <div className="auth-actions">
          <button onClick={isSignup ? handleSignup : handleLogin} disabled={isLoading}>
            {isSignup ? 'Signup' : 'Login'}
          </button>
          <button className="secondary-button" onClick={handleModeToggle} disabled={isLoading}>
            {isSignup ? 'Zum Login wechseln' : 'Account erstellen'}
          </button>
        </div>

        {/* Vollbild-Overlay mit Video während der simulierten Anmeldung. */}
        {isLoading && (
          <div className="loading-popup" role="status" aria-live="polite">
            <video
              className="loading-video"
              autoPlay
              muted
              playsInline
              onEnded={handleLoadingFinished}
              onError={handleLoadingFinished}
            >
              <source src={loadingVideo} type="video/mp4" />
            </video>
          </div>
        )}
      </main>
    </div>
  )
}
