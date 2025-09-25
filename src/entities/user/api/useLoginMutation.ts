import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = { requires2FA: boolean };

async function login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }

    return response.json();
}

export function useLoginMutation() {
    return useMutation({ mutationFn: login });
}