import { useState } from "react";
import "./Authentication.css";
import Password from "../../components/Password/Password";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

function Authentication({ _type = "login" }) {
  const [type, setType] = useState(_type);

  const toggleAuth = () => {
    setType((prev) => (prev === "login" ? "signup" : "login"));
  };

  const handleForgotPassword = () => {
    setType("forgot");
  };

  const handleBackToLogin = () => {
    setType("login");
  };

  return (
    <Box className="auth-container">
      <Card className="auth-card">
        <CardContent>
          <Typography variant="h3" className="auth-title">
            {type === "login"
              ? "Connexion"
              : type === "signup"
                ? "Inscription"
                : "Mot de passe oublié"}
          </Typography>

          <Stack spacing={1.5}>
            {type === "signup" && (
              <div className="auth-row">
                <TextField className="auth-half" label="Nom" fullWidth />

                <TextField className="auth-half" label="Prénom" fullWidth />
              </div>
            )}

            {type === "forgot" && (
              <Typography className="auth-description">
                Entrez votre adresse email pour recevoir un lien de
                réinitialisation de votre mot de passe.
              </Typography>
            )}

            <TextField fullWidth label="Adresse email" type="email" />

            {type !== "forgot" && <Password fullWidth label="Mot de passe" />}

            {type === "login" && (
              <div className="auth-forgot">
                <Button
                  variant="text"
                  onClick={handleForgotPassword}
                  className="auth-forgot-btn"
                >
                  Mot de passe oublié ?
                </Button>
              </div>
            )}

            {type === "signup" && (
              <Password fullWidth label="Confirmation du mot de passe" />
            )}

            <Button variant="contained" fullWidth className="auth-button">
              {type === "login"
                ? "Se connecter"
                : type === "signup"
                  ? "Créer un compte"
                  : "Envoyer le lien"}
            </Button>

            {type === "forgot" ? (
              <div className="auth-switch">
                <span>Retour à la</span>

                <Button
                  variant="text"
                  onClick={handleBackToLogin}
                  className="auth-switch-btn"
                >
                  Connexion
                </Button>
              </div>
            ) : (
              <div className="auth-switch">
                <span>
                  {type === "login"
                    ? "Pas encore de compte ?"
                    : "Déjà un compte ?"}
                </span>

                <Button
                  variant="text"
                  onClick={toggleAuth}
                  className="auth-switch-btn"
                >
                  {type === "login" ? "S'inscrire" : "Se connecter"}
                </Button>
              </div>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Authentication;
