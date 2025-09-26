import Cookies from "js-cookie";

const API_URL = "";

export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
    // Load tokens from cookies
    let accessToken: string | null = Cookies.get("accessToken") ?? null;
    const refreshToken: string | null = Cookies.get("refreshToken") ?? null;

    // Case 1: No accessToken but refreshToken exists → try refreshing session
    if (!accessToken && refreshToken) {
        const refreshRes = await fetch(`/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        // Store the new accessToken in cookies
        if (refreshRes.ok) {
            const data = await refreshRes.json();
            accessToken = data.accessToken ?? null;
            if (accessToken) {
                Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
            }
        } else {
            // Both tokens invalid → clear session and force re-login
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            throw new Error("Session expired, please log in again.");
        }
    }

    // Prepare headers with the latest accessToken (if available)
    const headers: HeadersInit = {
        ...(init?.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        "Content-Type": "application/json",
    };

    // Case 2: Perform the main request
    let response = await fetch(API_URL + input, { ...init, headers });

    // Case 3: If server rejects with 401 (expired token), attempt refresh
    if (response.status === 401 && refreshToken) {
        const refreshRes = await fetch(`/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
            // Update accessToken and retry the original request
            const data = await refreshRes.json();
            accessToken = data.accessToken ?? null;
            if (accessToken) {
                Cookies.set("accessToken", accessToken, { expires: 7, secure: true });
            }

            // повторяем оригинальный запрос
            const retryHeaders: HeadersInit = {
                ...(init?.headers || {}),
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                "Content-Type": "application/json",
            };

            response = await fetch(API_URL + input, { ...init, headers: retryHeaders });
        } else {
            // Refresh failed → clear tokens and force logout
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            throw new Error("Session expired, please log in again.");
        }
    }

    return response;
}