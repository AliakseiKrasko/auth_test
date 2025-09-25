import {useState, type FC, type FormEvent,} from "react";
import {useVerify2FAMutation} from "@/entities/user/api/useVerify2FAMutation.ts";

export const TwoFactorPage: FC = () => {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));

    const verify2FA = useVerify2FAMutation();

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return; // only numbers
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // autofocus on the next input
        if (value && index < code.length - 1) {
            const next = document.getElementById(`code-${index + 1}`);
            (next as HTMLInputElement)?.focus();
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const fullCode = code.join("");
        if (fullCode.length === 6) {
            verify2FA.mutate(fullCode, {
                onSuccess: (data) => {
                    localStorage.setItem("authToken", data.token);
                    alert("2FA success!");
                },
                onError: (err) => {
                    alert((err as Error).message);
                },
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                {/* Лого */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-900">Company</h1>
                </div>

                {/* Заголовок */}
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
                    Two-Factor Authentication
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Enter the 6-digit code from your authenticator app
                </p>

                {/* Форма */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between gap-2">
                        {code.map((digit, i) => (
                            <input
                                key={i}
                                id={`code-${i}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, i)}
                                className="w-12 h-12 text-center text-lg text-black border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={code.join("").length < 6}
                        className={`w-full font-medium py-2 rounded-lg transition ${
                            code.join("").length < 6
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};