import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

async function getJson(res) {
    if (!res.ok) {
        // Fallback if error isn't JSON
        const err = await res.json().catch(() => ({}));
        const error = new Error(err.message || res.statusText);
        error.status = res.status;
        throw error;
    }
    return res.json();
}

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
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        const { accessToken } = await getJson(res);
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

    // credentials: "include" → browser stores the httpOnly cookie from Set-Cookie header
    const login = useCallback(async (payload) => {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await getJson(res);
        addToken(data.accessToken);
        return data;
    }, [addToken]);

    const signup = useCallback(async (payload) => {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return getJson(res);
    }, []);

    // Server clears the refreshToken cookie
    const logout = useCallback(async (payload = {}) => {
        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/logout', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            return await getJson(res);
        } finally {
            removeToken();
        }
    }, [removeToken]);

    return (
        <AuthContext.Provider value={{ token, decoded, isTokenExpired, authFetch, addToken, removeToken, refresh, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within <AuthProvider>');
    return context;
}   