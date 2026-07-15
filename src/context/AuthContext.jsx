import { useMemo, useState } from 'react'
import AuthContext from './auth-context.js'

// LocalStorage-Key für den aktuellen Login-Status.
const AUTH_STORAGE_KEY = 'loggedInUser'

// Liest den zuletzt eingeloggten Nutzer aus dem Browser-Speicher.
function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Stellt Login-Status und Auth-Aktionen global zur Verfügung.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  // Speichert den erfolgreichen Login in State + localStorage.
  function login(nextUser) {
    setUser(nextUser)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
  }

  // Löscht den Login-Status aus State + localStorage.
  function logout() {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({ user, login, logout }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
