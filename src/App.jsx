import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

import Home from "./pages/Home/Home.jsx";
import Authentication from "./pages/Authentication/Authentication.jsx";

import "./App.css";

function App() {
  return (
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
  );
}

export default App;
