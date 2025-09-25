export async function verify2FA(code: string): Promise<{ token: string }> {
    const response = await fetch("/api/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Invalid 2FA code");
    }

    return response.json();
}