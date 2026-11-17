import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useState } from 'react'
import { theme } from './theme/theme'
import Box from '@mui/material/Box'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import LoginPage from './pages/Auth/Login.jsx'
import SignupPage from './pages/Auth/Signup.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Favorites from './pages/Favorites/Favorites.jsx'
import Settings, { DEFAULT_SETTINGS } from './pages/Settings/Settings.jsx'
import { INITIAL_FAVORITES } from './data/favorites.js'
import './App.css'

function AppRoutes({ isLoggedIn, user, onLogin, onSignup, onUpdateUser, favorites, settings, onChangeSettings, onDeleteAccount }) {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} favorites={favorites.list} onRemoveFavorite={favorites.remove} />} />
      <Route
        path="/login"
        element={
          <LoginPage
            onLogin={(credentials) => {
              onLogin(credentials)
              navigate('/')
            }}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignupPage
            onSignup={(infos) => {
              onSignup(infos)
              navigate('/')
            }}
          />
        }
      />
      <Route
        path="/parametres"
        element={
          <Settings
            settings={settings}
            onChangeSettings={onChangeSettings}
            onDeleteAccount={() => {
              onDeleteAccount()
              navigate('/')
            }}
          />
        }
      />
      <Route path="/profil"element={<Profile user={user} onUpdateUser={onUpdateUser} />} />
      <Route
        path="/favoris"
        element={
          <Favorites
            favorites={favorites.list}
            onAdd={favorites.add}
            onRemove={favorites.remove}
            onUpdateNote={favorites.updateNote}
            onRestore={favorites.restore}
          />
        }
      />
    </Routes>
  )
}

function App() {
  // Démo locale : remplace par ton vrai contexte d'auth une fois l'API branchée.
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ firstName: 'Camille', lastName: 'Martin', email: 'camille@exemple.fr', initials: 'CM' })

  // TODO: remplacer par l'appel API (POST /user/login) + stockage du token
  const handleLogin = (credentials) => {
    setUser({
      firstName: credentials.email.split('@')[0],
      lastName: '',
      email: credentials.email,
      initials: credentials.email[0]?.toUpperCase() ?? '??',
    })
    setIsLoggedIn(true)
  }

  // TODO: remplacer par l'appel API (POST /user/signup) + stockage du token
  const handleSignup = (infos) => {
    setUser({
      firstName: infos.firstName,
      lastName: infos.lastName,
      email: infos.email,
      initials: `${infos.firstName[0] ?? ''}${infos.lastName[0] ?? ''}`.toUpperCase(),
    })
    setIsLoggedIn(true)
  }

  // TODO: remplacer par les appels API (GET/POST/PUT/DELETE /user/favorites)
  const [favoritesList, setFavoritesList] = useState(INITIAL_FAVORITES)
  const favorites = {
    list: favoritesList,
    add: (med) => setFavoritesList((l) => (l.some((f) => f.id === med.id) ? l : [...l, { ...med, note: '', recall: false }])),
    remove: (id) => setFavoritesList((l) => l.filter((f) => f.id !== id)),
    restore: (fav) => setFavoritesList((l) => (l.some((f) => f.id === fav.id) ? l : [...l, fav].sort((a, b) => a.id - b.id))),
    updateNote: (id, note) => setFavoritesList((l) => l.map((f) => (f.id === id ? { ...f, note } : f))),
  }

  // TODO: remplacer par les appels API (GET/PUT /user/settings)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const handleChangeSettings = (changes) => setSettings((s) => ({ ...s, ...changes }))

  // TODO: remplacer par l'appel API (DELETE /user/me) + suppression du token
  const handleDeleteAccount = () => {
    setFavoritesList([])
    setSettings(DEFAULT_SETTINGS)
    setIsLoggedIn(false)
  }

  // TODO: remplacer par l'appel API (PUT /user/me)
  const handleUpdateUser = (changes) => {
    setUser((prev) => {
      const next = { ...prev, ...changes }
      return { ...next, initials: `${next.firstName[0] ?? ''}${next.lastName[0] ?? ''}`.toUpperCase() || '??' }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>

        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header isLoggedIn={isLoggedIn} userInitials={user.initials} onLogout={() => setIsLoggedIn(false)} />

        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppRoutes isLoggedIn={isLoggedIn} user={user} onLogin={handleLogin} onSignup={handleSignup} onUpdateUser={handleUpdateUser} favorites={favorites} settings={settings} onChangeSettings={handleChangeSettings} onDeleteAccount={handleDeleteAccount} />
        </Box>

        <Footer />
        </Box>

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
