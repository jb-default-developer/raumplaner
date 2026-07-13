import { useState } from 'react'
import { login } from './data/login.js'
import './App.css'
import Home from './components/Home.jsx'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  return (
    <div>
      <input  placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input  placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default App
