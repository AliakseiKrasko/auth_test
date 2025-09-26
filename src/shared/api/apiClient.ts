import Cookies from "js-cookie";

const API_URL = "";

export async function apiFetch(input: string, init?: RequestInit): Promise<Response> {
    let accessToken: string | null = Cookies.get("accessToken") ?? null;
    const refreshToken: string | null = Cookies.get("refreshToken") ?? null;

    // Если accessToken отсутствует, но refreshToken есть → пробуем обновить
    if (!accessToken && refreshToken) {
        const refreshRes = await fetch(`/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            accessToken = data.accessToken ?? null;
            if (accessToken) {
                Cookies.set("accessToken", accessToken, { expires: 1, secure: true });
            }
        } else {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            throw new Error("Session expired, please log in again.");
        }
    }

    // Делаем основной запрос
    const headers: HeadersInit = {
        ...(init?.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        "Content-Type": "application/json",
    };

    let response = await fetch(API_URL + input, { ...init, headers });

    // Если токен протух прямо во время запроса → пробуем обновить
    if (response.status === 401 && refreshToken) {
        const refreshRes = await fetch(`/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
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
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            throw new Error("Session expired, please log in again.");
        }
    }

    return response;
}