import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

// Sperrt Login/Signup für bereits eingeloggte Nutzer.
export default function PublicOnlyRoute({ children }) {
  const { user } = useAuth()

  if (user) {
    // Bereits eingeloggt: zurück zur Startseite.
    return <Navigate to="/" replace />
  }

  // Nicht eingeloggt: öffentliche Seite anzeigen.
  return children
}
