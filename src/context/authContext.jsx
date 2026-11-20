import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);
const BASE_URL = "http://localhost:3000"

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                setDecoded(jwtDecode(token));
            }
            catch {
                setDecoded(null);
                setToken(null);
                localStorage.removeItem('accessToken');
            }
        } else {
            setDecoded(null);
        }
    }, [token]);

    const isTokenExpired = useCallback(() => {
        // Non-expiring token
        if (!decoded?.exp) return false;
        return Date.now() / 1000 >= decoded.exp;
    }, [decoded?.exp]);

    const addToken = useCallback((newToken) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
    }, []);

    const removeToken = useCallback(() => {
        localStorage.removeItem('accessToken');
        setToken(null);
    }, []);

    const refresh = useCallback(async () => {
        const res = await fetch(BASE_URL + '/user/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        if (!res.ok) throw new Error('Refresh failed');
        const { accessToken } = await res.json();
        addToken(accessToken);
    }, [addToken]);

    const authFetch = useCallback(async (url, options = {}) => {
        let current = token;

        if (isTokenExpired()) {
            try {
                await refresh();
                current = localStorage.getItem("accessToken");
            } catch {
                removeToken();
                throw new Error("Session expired. Please log in again.");
            }
        }

        const res = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${current}`,
                ...options.headers,
            },
        });

        // If the server isn't sync with client / Edge Cases
        if (res.status === 401) {
            try {
                await refresh();
                current = localStorage.getItem("accessToken");
            } catch {
                removeToken();
                throw new Error("Session expired. Please log in again.");
            }

            return fetch(url, {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${current}`,
                    ...options.headers,
                },
            });
        }

        return res;

    }, [token, isTokenExpired, refresh, removeToken]);


    // ─── LOGIN ─────────────────────────────────────────────────
    // credentials: "include" → browser stores the httpOnly cookie from Set-Cookie header
    const login = useCallback((email, password) => {
        fetch(BASE_URL + '/user/login', {
            method: 'POST',
            credentials: 'include',  // ← CRITICAL: browser stores the httpOnly cookie
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        .then(res => {
            if (!res.ok) {
                const err = res.json().catch(() => ({}));
                throw new Error(err.error || 'Login failed');
            }
            return res.json()
        })
        .then(data => {
            const accessToken = data.accessToken;
            addToken(accessToken);
        })
        .catch(err => console.error(err))
    }, [addToken]);

    // ─── LOGOUT ────────────────────────────────────────────────
    // Server clears the refreshToken cookie via res.clearCookie(...)
    const logout = useCallback(() => {
        fetch(BASE_URL + '/user/logout', {
            method: 'DELETE',
            credentials: 'include',  // ← server needs to read the cookie to clear it
        })
        .then(res => {
            removeToken();
        })
        .catch(err => console.error(err))
    }, [removeToken]);

    return (
        <AuthContext.Provider value={{ token, decoded, isTokenExpired, authFetch, addToken, removeToken, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within <AuthProvider>');
    return context;
}   