import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Authentication from "./pages/Authentication/Authentication.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import "./App.css";

function AppContent() {
  const location = useLocation();

  const showHeader = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication type="login" />} />
        <Route path="/signup" element={<Authentication type="signup" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
