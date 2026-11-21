import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { AuthProvider } from "./context/authContext.jsx";

import Header from "./components/Header/Header.jsx";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

import Home from "./pages/Home/Home.jsx";
import Authentication from "./pages/Authentication/Authentication.jsx";

import "./App.css";

function App() {
  return (
    <AuthProvider>

        <BrowserRouter>
        <Header />

        <Routes>
            <Route element={<ProtectedRoute />}>
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Authentication type="login" />} />
            <Route path="/signup" element={<Authentication type="signup" />} />

        </Routes>
        </BrowserRouter>
        
    </AuthProvider>
  );
}

export default App;
