import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <main className="not-found">
      {/* Décorations */}
      <div className="not-found__corner not-found__corner--top"></div>
      <div className="not-found__corner not-found__corner--bottom"></div>

      {/* Contenu */}
      <div className="not-found__content">
        <div className="not-found__error">
          <div className="not-found__highlight"></div>
          <span>404</span>
        </div>

        <h1>Page introuvable</h1>

        <p>
          La page que vous recherchez n'existe pas
          <br className="not-found__desktop-break" /> ou a peut-être été
          déplacée.
        </p>

        <Link to="/" className="not-found__button">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
