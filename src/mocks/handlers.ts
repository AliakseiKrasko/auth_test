import { http, HttpResponse } from "msw";

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
    http.post("/api/verify-2fa", async ({ request }) => {
        const { code } = (await request.json()) as { code: string };

        if (code === "123456") {
            return HttpResponse.json({ token: "fake-jwt-token" }, { status: 200 });
        }

        return HttpResponse.json({ message: "Invalid code" }, { status: 400 });
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