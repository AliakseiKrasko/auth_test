import { createBrowserRouter, RouterProvider as Provider } from "react-router-dom";
import {LoginPage} from "@/pages/login/LoginPage.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
]);

export const RouterProvider = () => {
    return <Provider router={router} />;
};