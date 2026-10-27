import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useState } from 'react'
import { theme } from './theme/theme'
import Header from './components/Header/Header.jsx'
import Home from './components/Home/Home.jsx'
import './App.css'

function App() {
  // Démo locale : remplace par ton vrai contexte d'auth
  // (ex: const { isLoggedIn, user } = useAuth();) une fois le login branché.
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = { firstName: 'Camille', initials: 'CM' }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>

        <Header isLoggedIn={isLoggedIn} userInitials={user.initials} />

        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
        </Routes>

        {/* Bouton de démo uniquement, à retirer une fois l'auth branchée */}
        <button
          onClick={() => setIsLoggedIn((v) => !v)}
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            background: '#084734',
            color: '#FFF9DB',
            border: 'none',
            borderRadius: 999,
            padding: '10px 20px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {isLoggedIn ? 'Simuler déconnexion' : 'Simuler connexion'}
        </button>

      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App