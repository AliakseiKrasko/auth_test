import { createBrowserRouter, RouterProvider as Provider } from "react-router-dom";
import {LoginPage} from "@/pages/login/LoginPage.tsx";
import {TwoFactorPage} from "@/pages/twofa/ui/TwoFactorPage.tsx";
import {Dashboard} from "@/pages/dashboard/Dashboard.tsx";


const router = createBrowserRouter([
    { path: "/", element: <LoginPage />},
    { path: "/2fa", element: <TwoFactorPage /> },
    { path: "/dashboard", element: <Dashboard /> },

]);

export const RouterProvider = () => {
    return <Provider router={router} />;
};