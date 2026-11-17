import { useState } from "react";
import "./Authentication.css";

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

  return (
    <Box className="auth-container">
      <Card className="auth-card">
        <CardContent>
          <Typography variant="h3" className="auth-title">
            {type === "login" ? "Connexion" : "Inscription"}
          </Typography>

          <Stack spacing={1.5}>
            {type === "signup" && (
              <div className="auth-row">
                <TextField className="auth-half" label="Nom" fullWidth />

                <TextField className="auth-half" label="Prénom" fullWidth />
              </div>
            )}

            <TextField fullWidth label="Adresse email" type="email" />

            <TextField fullWidth label="Mot de passe" type="password" />

            {type === "signup" && (
              <TextField
                fullWidth
                label="Confirmation du mot de passe"
                type="password"
              />
            )}

            <Button variant="contained" fullWidth className="auth-button">
              {type === "login" ? "Se connecter" : "Créer un compte"}
            </Button>

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
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Authentication;
