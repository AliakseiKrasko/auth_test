import { createBrowserRouter, RouterProvider as Provider } from "react-router-dom";
import {LoginPage} from "@/pages/login/LoginPage.tsx";
import {TwoFactorPage} from "@/pages/twofa/ui/TwoFactorPage.tsx";
import {Dashboard} from "@/pages/dashboard/ui/Dashboard.tsx";


const router = createBrowserRouter([
    // Root path -> login screen
    { path: "/", element: <LoginPage />},
    // 2FA step -> shown after login if authentication requires code
    { path: "/2fa", element: <TwoFactorPage /> },
    // Protected area -> main dashboard after successful authentication
    { path: "/dashboard", element: <Dashboard /> },

]);

export const RouterProvider = () => {
    // Provides routing context to the entire app
    // This is the top-level provider for all navigation
    return <Provider router={router} />;
};