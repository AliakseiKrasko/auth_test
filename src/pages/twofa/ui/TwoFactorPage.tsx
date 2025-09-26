import {useState, type FC, type FormEvent, useEffect} from "react";
import {useVerify2FAMutation} from "@/entities/user/api/useVerify2FAMutation.ts";
import {useAuth} from "@/shared/auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {queryClient} from "@/app/providers/queryClient.ts";
import {ArrowLeft} from "lucide-react";

export const TwoFactorPage: FC = () => {
    // State for the 6-digit code input
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    // Timer countdown in seconds
    const [timeLeft, setTimeLeft] = useState(45);
    // Error message for invalid codes
    const [error, setError] = useState<string | null>(null);

    const verify2FA = useVerify2FAMutation();
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    const fullCode = code.join("");
    const isCodeComplete = fullCode.length === 6;

    // Timer only runs while code is incomplete and time > 0
    useEffect(() => {
        if (isCodeComplete || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isCodeComplete]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return; // Only digits allowed
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError(null); // Reset error on new input

        // Automatically focus the next input field after entering a digit
        if (value && index < code.length - 1) {
            const next = document.getElementById(`code-${index + 1}`);
            (next as HTMLInputElement)?.focus();
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isCodeComplete) {
            verify2FA.mutate(
                { code: fullCode },
                {
                    onSuccess: (data) => {
                        // On success → store token in context and cache, then navigate
                        setAccessToken(data.accessToken);
                        queryClient.setQueryData(["authToken"], data.accessToken);
                        navigate("/dashboard");
                    },
                    onError: () => {
                        // If 2FA fails, show error and disable "Continue"
                        setError("Invalid code");
                    },
                }
            );
        }
    };

    const handleGetNewCode = () => {
        // Resets state and restarts the timer
        setCode(Array(6).fill("")); // очищаем поле
        setTimeLeft(45); // сброс таймера
        setError(null);
    };

    const formatTime = (seconds: number) => {
        // Formats countdown as MM:SS
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 relative">
                {/* Back button */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-800" />
                </button>

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-900">Company</h1>
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
                    Two-Factor Authentication
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Enter the 6-digit code from the Google Authenticator app
                </p>

                {/* Form with 6 digit inputs */}
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

                    {error && (
                        <p className="text-red-500 text-sm text-start">{error}</p>
                    )}

                    {/* Countdown / Resend button disappears once code is complete */}
                    {isCodeComplete && (
                        <button
                            type="submit"
                            disabled={!!error}
                            className={`w-full font-medium py-2 rounded-lg transition
    ${error
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        >
                            Continue
                        </button>
                    )}
                </form>

                {/* Timer / Get new button (disappears when the code is entered completely) */}
                {!isCodeComplete && (
                    <div className="text-center mt-6">
                        {timeLeft > 0 ? (
                            <p className="text-gray-500">
                                Get a new code in {formatTime(timeLeft)}
                            </p>
                        ) : (
                            <button
                                onClick={handleGetNewCode}
                                className="w-full font-medium py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                            >
                                Get new
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};