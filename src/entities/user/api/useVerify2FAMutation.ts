import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "@/shared/auth/AuthContext.tsx";
import Cookies from "js-cookie";

type VerifyPayload = { code: string };
type VerifyResponse = { accessToken: string, refreshToken: string; };

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
    const queryClient = useQueryClient();
    const { setAccessToken } = useAuth();

    return useMutation({
        mutationFn: verify2FA,
        onSuccess: (data) => {
            // сохраняем accessToken в контекст
            setAccessToken(data.accessToken);

            // сохраняем refreshToken в cookies
            Cookies.set("refreshToken", data.refreshToken, { expires: 7, secure: true });

            // пишем accessToken в кэш React Query
            queryClient.setQueryData(["authToken"], data.accessToken);

            console.log("2FA verified ✅, tokens saved");
        },
    });
}

// export function useVerify2FAMutation() {
//     return useMutation({ mutationFn: verify2FA });
// }