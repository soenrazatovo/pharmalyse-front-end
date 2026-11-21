import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Stack,
} from "@mui/material";

import Password from "../../components/Password/Password";
import { useAuth } from "../../context/authContext";

import "./Authentication.css";

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[^\s]{12,}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function htmlspecialchars(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return str.replace(/[&<>"']/g, c => map[c]);
}

function Authentication({ _type = "login" }) {
    const [type, setType] = useState(_type);
    const [formValues, setFormValues] = useState({});
    const [popup, setPopup] = useState({ message: "", status: ""});

    const { login, signup, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (payload) => {
        try {
            const data = await login(payload);
            setPopup({ message: data.message, status: "success" });

            // const from = location.state?.from?.pathname || "/";
            // navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            setPopup({ message: err.message, status: "error" });
        }
    };

    const handleSignup = async (payload) => {
        try {
            const data = await signup(payload);
            setPopup({ message: data.message, status: "success" });
            navigate("/login", { replace: true });
        } catch (err) {
            console.error(err);
            setPopup({ message: err.message, status: "error" });
        }
    };

    const handleLogout = async () => {
        try {
            const data = await logout();
            setPopup({ message: data.message, status: "success" });
        } catch (err) {
            console.error(err);
            setPopup({ message: err.message, status: "error" });
        }
        navigate("/login", { replace: true });
    };

    const toggleType = () => {
        setType((prev) => (prev === "login" ? "signup" : "login"));
    };

    const isEmailValid = formValues?.email?.content && regexEmail.test(formValues.email.content);
    const isPasswordValid = formValues?.password?.content && regexPassword.test(formValues.password.content);
    const isPasswordConfirmValid = formValues?.passwordConfirm?.content && formValues.passwordConfirm.content === formValues.password.content;

    const isFormValid =
        type === "signup"
            ? isEmailValid && isPasswordValid && isPasswordConfirmValid
            : isEmailValid;

    const handleSubmit = () => {
        if (!isFormValid) return;
        console.log("Form Dynamic Valid")

        let requiredFields = [];

        switch (type) {
            case "login":
                requiredFields = ["email", "password"]
                break;
            case "signup":
                requiredFields = ["firstname", "surname", "email", "password", "passwordConfirm"]
                break;
            case "forgot":
                requiredFields = []
                break;
        }

        let error = false;

        requiredFields.forEach((field) => {
            if (!formValues?.[field]?.content || formValues?.[field]?.content === "") {
                setFormValues((values) => ({ ...values, [field]: { ...values[field], error: "Requis" } }));
                error = true;
            }
        });

        if (error) {
            setPopup({message: "Champ(s) manquant(s)", status: "error"})
            return;
        }
        console.log("Form Submit Valid")


        switch (type) {
            case "login":
                console.log("Login Valid")

                const loginPayload = {
                    email: htmlspecialchars(formValues?.email?.content),
                    password: htmlspecialchars(formValues?.password?.content)
                }
                handleLogin(loginPayload);
                break;

            case "signup":
                console.log("Signup Valid")

                const signupPayload = {
                    firstname: htmlspecialchars(formValues?.firstname?.content),
                    surname: htmlspecialchars(formValues?.surname?.content),
                    email: htmlspecialchars(formValues?.email?.content),
                    password: htmlspecialchars(formValues?.password?.content)
                }
                handleSignup(signupPayload);
                break;

            case "forgot":
                console.log("Forgot Valid")

                // Signup
                const forgotPayload = {
                    email: htmlspecialchars(formValues?.email?.content)
                }

                console.log(forgotPayload)
                break;
        }
    }

    useEffect(() => {
        console.log(formValues)
    }, [formValues])

    useEffect(() => {
        setFormValues({})
    }, [type])


    return (
        <>
        { popup?.message &&
            <p style={{color: (popup?.status == "error" ? "red" : "green")}}>{popup?.message}</p>
        }
        <Button
            variant="text"
            onClick={handleLogout}
            className="auth-forgot-btn"
        >
            Logout
        </Button>
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
                                {/* formValues?.firstname */}
                                <TextField className="auth-half" label="Nom" fullWidth
                                    error={!formValues?.surname?.content && formValues?.surname?.error}
                                    value={formValues?.surname?.content || ""}
                                    onChange={(e) => setFormValues((values) => ({ ...values, surname: { ...values.surname, content: e.target.value } }))}
                                    helperText={
                                        !formValues?.surname?.content && formValues?.surname?.error || " "
                                    }
                                />
                                <TextField className="auth-half" label="Prénom" fullWidth
                                    error={!formValues?.firstname?.content && formValues?.firstname?.error}
                                    value={formValues?.firstname?.content || ""}
                                    onChange={(e) => setFormValues((values) => ({ ...values, firstname: { ...values.firstname, content: e.target.value } }))}
                                    helperText={
                                        !formValues?.firstname?.content && formValues?.firstname?.error || " "
                                    }
                                />
                            </div>
                        )}

                        {type === "forgot" && (
                            <Typography className="auth-description">
                                Entrez votre adresse email pour recevoir un lien de
                                réinitialisation de votre mot de passe.
                            </Typography>
                        )}

                        <TextField fullWidth label="Adresse email" type="email"
                            error={formValues?.email?.content && !isEmailValid}
                            value={formValues?.email?.content || ""}
                            onChange={(e) => setFormValues((values) => ({ ...values, email: { ...values.email, content: e.target.value } }))}
                            helperText={
                                formValues?.email?.content && !isEmailValid
                                    ? "Adresse email invalide"
                                    : formValues?.email?.error || " "
                            }
                        />

                        {type !== "forgot" && (
                            <div className={type === "login" ? "auth-password-wrapper" : ""}>
                                <Password fullWidth label="Mot de passe"
                                    error={type == "login"
                                        ? !formValues?.password?.content && formValues?.password?.error
                                        : formValues?.password?.content && !isPasswordValid}
                                    value={formValues?.password?.content || ""}
                                    onChange={(e) => setFormValues((values) => ({ ...values, password: { ...values.password, content: e.target.value } }))}
                                    helperText={
                                        type == "login"
                                            ? !formValues?.password?.content && formValues?.password?.error || " "
                                            : formValues?.password?.content && !isPasswordValid
                                                ? "12 caractères, avec majuscule, minuscule, chiffre et symbole"
                                                : " "
                                    }
                                />

                                {type === "login" && (
                                    <div className="auth-forgot">
                                        <Button
                                            variant="text"
                                            onClick={() => setType("forgot")}
                                            className="auth-forgot-btn"
                                        >
                                            Mot de passe oublié ?
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {type === "signup" && (
                            <Password fullWidth label="Confirmation du mot de passe"
                                error={formValues?.passwordConfirm?.content && !isPasswordConfirmValid}
                                value={formValues?.passwordConfirm?.content || ""}
                                onChange={(e) => setFormValues((values) => ({ ...values, passwordConfirm: { ...values.passwordConfirm, content: e.target.value } }))}
                                helperText={
                                    formValues?.passwordConfirm?.content && !isPasswordConfirmValid
                                        ? "Les mots de passe ne correspondent pas"
                                        : " "
                                }
                            />
                        )}

                        <Button
                            variant="contained"
                            fullWidth
                            className="auth-button"
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                        >
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
                                    onClick={() => setType("login")}
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
                                    onClick={toggleType}
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
        </>
    );
}

export default Authentication;
