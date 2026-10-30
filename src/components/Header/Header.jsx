import { Link } from "react-router-dom";
import "./Header.css";


function Header() {
    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            </header>
        </>
    );
}

export default Header;