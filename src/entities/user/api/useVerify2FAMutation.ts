import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "@/shared/auth/AuthContext.tsx";
import Cookies from "js-cookie";

type VerifyPayload = { code: string };
type VerifyResponse = { accessToken: string, refreshToken: string; };

async function verify2FA(payload: VerifyPayload): Promise<VerifyResponse> {
    const response = await fetch("/api/verify-2fa", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
        credentials: "include", // ensures cookies (refreshToken) are updated by the server
    });
    // If verification fails, propagate error to React Query's error state
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Invalid 2FA code");
    }
    // On success, return the parsed JSON (contains tokens)
    return response.json();

}

export function useVerify2FAMutation() {
    const queryClient = useQueryClient();
    const {setAccessToken} = useAuth();

    return useMutation({
        mutationFn: verify2FA,
        onSuccess: (data) => {
            // Save accessToken in global auth context (used for authenticated requests)
            setAccessToken(data.accessToken);

            // Persist refreshToken in cookies (7 days, secure for HTTPS only)
            Cookies.set("refreshToken", data.refreshToken, {expires: 7, secure: true});

            // Store accessToken in React Query cache (allows access via useQuery later)
            queryClient.setQueryData(["authToken"], data.accessToken);

            console.log("2FA verified ✅, tokens saved");
        },
    });
}

