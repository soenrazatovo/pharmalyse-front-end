import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export default function PageNotFound() {
  return (
    <main className="not-found">
      {/* Formes décoratives */}
      <div className="not-found__corner not-found__corner--top" />
      <div className="not-found__corner not-found__corner--bottom" />

      {/* Contenu principal */}
      <div className="not-found__content">
        <div className="not-found__error">
          <div className="not-found__highlight" />
          <span>404</span>
        </div>

        <h1>Page Not Found</h1>

        <p>
          The page you're looking for doesn't exist
          <br className="not-found__desktop-break" /> or may have been moved.
        </p>

        <Link to="/" className="not-found__button">
          Go to Home
        </Link>
      </div>
    </main>
  );
}
// harmonisation français, enlever animation bouton. 