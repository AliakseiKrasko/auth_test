import { useMutation } from "@tanstack/react-query";

type VerifyPayload = { code: string };
type VerifyResponse = { token: string; };

async function verify2FA(payload: VerifyPayload): Promise<VerifyResponse> {
    const response = await fetch("/api/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", // refreshToken-cookie обновляется
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Invalid 2FA code");
    }

    return response.json();
}

export function useVerify2FAMutation() {
    return useMutation({ mutationFn: verify2FA });
}