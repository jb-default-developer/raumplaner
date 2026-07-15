import { useContext } from 'react'
import AuthContext from './auth-context.js'

// Komfort-Hook zum Zugriff auf den globalen Auth-Kontext.
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
