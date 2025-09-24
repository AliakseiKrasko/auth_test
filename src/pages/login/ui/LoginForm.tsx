import {type FC, type FormEvent, useState} from "react";
import {User, LockIcon } from "lucide-react";
import {useLoginMutation} from "@/entities/user/api/useLoginMutation.ts";

export const LoginForm: FC = () => {
    // Local form status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginMutation = useLoginMutation();

    const isFormValid = email.includes("@") && password.length >= 6;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        loginMutation.mutate({ email, password });


    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                {/* Logo + name */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-900">Company</h1>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
                    Sign in to your account to continue
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
                        <User className="w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="ml-2 w-full outline-none text-gray-600"
                        />
                    </div>
                    {/* Password */}
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
                        <LockIcon  className="w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="ml-2 w-full outline-none text-gray-600"
                        />
                    </div>
                    {/* Error */}
                    {loginMutation.isError && (
                        <p className="text-red-500 text-sm text-center">
                            {(loginMutation.error as Error).message}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={!isFormValid || loginMutation.isPending}
                        className={`w-full font-medium py-2 rounded-lg transition ${
                            !isFormValid || loginMutation.isPending
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        {loginMutation.isPending ? "Logging in..." : "Log in"}
                    </button>
                </form>
            </div>
        </div>
    );
};