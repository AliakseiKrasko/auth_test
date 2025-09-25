import { createBrowserRouter, RouterProvider as Provider } from "react-router-dom";
import {LoginPage} from "@/pages/login/LoginPage.tsx";
import {TwoFactorPage} from "@/pages/twofa/ui/TwoFactorPage.tsx";


const router = createBrowserRouter([
    { path: "/", element: <LoginPage />},
    { path: "/2fa", element: <TwoFactorPage /> },
    { path: "/dashboard", element: <div>Welcome to dashboard!</div> },

]);

export const RouterProvider = () => {
    return <Provider router={router} />;
};