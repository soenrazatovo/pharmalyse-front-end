import HomeLoggedOut from './HomeLoggedOut'
import HomeLoggedIn from './HomeLoggedIn'

// isLoggedIn / user viennent de App.jsx (ton futur contexte d'auth)
export default function Home({ isLoggedIn, user, favorites, onRemoveFavorite }) {
  return isLoggedIn ? (
    <HomeLoggedIn userName={user?.firstName} favorites={favorites} onRemoveFavorite={onRemoveFavorite} />
  ) : (
    <HomeLoggedOut />
  )
}