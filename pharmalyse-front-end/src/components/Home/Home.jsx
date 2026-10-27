import HomeLoggedOut from './HomeLoggedOut'
import HomeLoggedIn from './HomeLoggedIn'

// isLoggedIn / user viennent de App.jsx (ton futur contexte d'auth)
export default function Home({ isLoggedIn, user }) {
  return isLoggedIn ? (
    <HomeLoggedIn userName={user?.firstName} />
  ) : (
    <HomeLoggedOut />
  )
}