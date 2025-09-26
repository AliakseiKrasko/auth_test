import type { FC } from "react";
import {LoginForm} from "@/pages/login/ui/LoginForm.tsx";

export const LoginPage: FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            {/* Login form component */}
            <LoginForm />
        </div>
    );
};