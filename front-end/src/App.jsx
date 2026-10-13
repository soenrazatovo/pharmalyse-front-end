import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Home from './components/Home/Home.jsx'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
    
      <Header/>
      
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
