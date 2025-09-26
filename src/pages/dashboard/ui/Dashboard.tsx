import { useAuth } from "@/shared/auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication state (tokens, user info)
        logout();
        // Redirect user back to login page
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    🎉 Welcome to Dashboard!
                </h1>

                <p className="text-gray-600 mb-8">
                    You are successfully logged in.
                    Manage your account or log out below.
                </p>

                <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 active:scale-95 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};