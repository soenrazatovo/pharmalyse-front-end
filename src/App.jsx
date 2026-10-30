import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home/Home.jsx'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
    
      <Header/>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Authentication type="login"/>} />
        <Route path="/signup" element={<Authentication type="signup"/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
