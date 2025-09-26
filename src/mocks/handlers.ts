import { http, HttpResponse } from "msw";

let currentAccessToken = "initial-access-token";
const validRefreshToken = "mock-refresh-token";

export const handlers = [
    // Successful login
    http.post("/api/login", async ({ request }) => {
        const body = (await request.json()) as { email: string; password: string };
        const { email, password } = body;

        if (email === "admin@test.com" && password === "123456") {
            return HttpResponse.json({ requires2FA: true }, { status: 200 });
        }

        return HttpResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    }),
    // 2FA верификация → выдаём access + refresh
    http.post("/api/verify-2fa", async ({ request }) => {
        const { code } = (await request.json()) as { code: string };

        if (code === "123456") {
            // при успешной 2FA генерируем новый accessToken
            currentAccessToken = "access-" + Date.now();
            return HttpResponse.json(
                {
                    accessToken: currentAccessToken,
                    refreshToken: validRefreshToken,
                },
                { status: 200 }
            );
        }

        return HttpResponse.json({ message: "Invalid code" }, { status: 400 });
    }),
    // refreshToken → обновляем accessToken
    http.post("/api/refresh", async ({ request }) => {
        const { refreshToken } = (await request.json()) as { refreshToken: string };

        if (refreshToken === validRefreshToken) {
            currentAccessToken = "access-" + Date.now(); // новый accessToken
            return HttpResponse.json({ accessToken: currentAccessToken }, { status: 200 });
        }

        return HttpResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    }),

    // пример защищённого запроса
    http.get("/api/protected", async ({ request }) => {
        const authHeader = request.headers.get("authorization");

        if (authHeader === `Bearer ${currentAccessToken}`) {
            return HttpResponse.json({ data: "This is protected data" }, { status: 200 });
        }

        // если токен не совпадает → 401 → apiClient вызовет refresh
        return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }),

    // Server error
    http.post("/api/login-error", () => {
        return HttpResponse.json({ message: "Server error" }, { status: 500 });
    }),

    // Network error
    http.post("/api/login-network", () => {
        return HttpResponse.json({ message: "Network error" }, { status: 503 });
    }),
];