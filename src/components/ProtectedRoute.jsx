import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

// Sperrt Seiten für nicht eingeloggte Nutzer.
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    // Nicht eingeloggt: zurück auf Login.
    return <Navigate to="/login" replace />
  }

  // Eingeloggt: geschützten Inhalt anzeigen.
  return children
}
