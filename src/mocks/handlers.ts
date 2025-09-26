import { http, HttpResponse } from "msw";

let currentAccessToken = "initial-access-token";
const validRefreshToken = "mock-refresh-token";

export const handlers = [

    // --- LOGIN ENDPOINT ---
    // Simulates a successful login that requires 2FA
    http.post("/api/login", async ({ request }) => {
        const body = (await request.json()) as { email: string; password: string };
        const { email, password } = body;

        if (email === "admin@test.com" && password === "123456") {
            return HttpResponse.json({ requires2FA: true }, { status: 200 });
        }

        // Invalid credentials → return 401
        return HttpResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    }),

    // --- 2FA ENDPOINT ---
    // Verifies 2FA code and issues new access + refresh tokens
    http.post("/api/verify-2fa", async ({ request }) => {
        const { code } = (await request.json()) as { code: string };

        if (code === "123456") {
            // Generate a new access token for every successful verification
            currentAccessToken = "access-" + Date.now();
            return HttpResponse.json(
                {
                    accessToken: currentAccessToken,
                    refreshToken: validRefreshToken,
                },
                { status: 200 }
            );
        }

        // Invalid code → return 400
        return HttpResponse.json({ message: "Invalid code" }, { status: 400 });
    }),

    // --- REFRESH ENDPOINT ---
    // Exchanges a valid refreshToken for a new accessToken
    http.post("/api/refresh", async ({ request }) => {
        const { refreshToken } = (await request.json()) as { refreshToken: string };

        if (refreshToken === validRefreshToken) {
            currentAccessToken = "access-" + Date.now(); // новый accessToken
            return HttpResponse.json({ accessToken: currentAccessToken }, { status: 200 });
        }

        // Invalid refresh token → force logout
        return HttpResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    }),

    // --- PROTECTED ENDPOINT ---
    // Simulates an authenticated API call that requires Bearer token
    http.get("/api/protected", async ({ request }) => {
        const authHeader = request.headers.get("authorization");

        if (authHeader === `Bearer ${currentAccessToken}`) {
            return HttpResponse.json({ data: "This is protected data" }, { status: 200 });
        }

        // If token is invalid → client should attempt refresh
        return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }),

    // --- ERROR SIMULATIONS ---
    // Simulate server error (500)
    http.post("/api/login-error", () => {
        return HttpResponse.json({ message: "Server error" }, { status: 500 });
    }),

    // Simulate network/service unavailable error (503)
    http.post("/api/login-network", () => {
        return HttpResponse.json({ message: "Network error" }, { status: 503 });
    }),
];