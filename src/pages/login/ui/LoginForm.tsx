import type { FC } from "react";
import {User, LockIcon } from "lucide-react";

export const LoginForm: FC = () => {
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
                <form className="space-y-4">
                    <div className="flex items-center border rounded-lg px-3 py-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="ml-2 w-full outline-none text-gray-600"
                        />
                    </div>

                    <div className="flex items-center border rounded-lg px-3 py-2">
                        <LockIcon  className="w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="ml-2 w-full outline-none text-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled
                        className="w-full bg-gray-200 text-gray-500 font-medium py-2 rounded-lg cursor-not-allowed"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};