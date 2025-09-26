import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);

    // On mount: check if accessToken exists in cookies (persistent session)
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            setAccessTokenState(token);
        }
    }, []);

    // Updates React state + syncs the accessToken with cookies
    const setAccessToken = (token: string | null) => {
        setAccessTokenState(token);

        if (token) {
            Cookies.set("accessToken", token, { expires: 1, secure: true });
            // Save token in cookies
            // expires: 1 → 1 day lifetime
            // secure: true → only sent over HTTPS
        } else {
            // If token is null, remove from cookies
            Cookies.remove("accessToken");
        }
    };

    // Clears both access and refresh tokens → full logout
    const logout = () => {
        setAccessTokenState(null);
        Cookies.remove("accessToken");  // очистка accessToken
        Cookies.remove("refreshToken"); // очистка refreshToken
    };


    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume AuthContext safely
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};