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


    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            setAccessTokenState(token);
        }
    }, []);

    const setAccessToken = (token: string | null) => {
        setAccessTokenState(token);

        if (token) {
            Cookies.set("accessToken", token, { expires: 1, secure: true });
            // expires: 1 = хранение 1 дней
            // secure: true = только HTTPS
        } else {
            Cookies.remove("accessToken");
        }
    };
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

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};