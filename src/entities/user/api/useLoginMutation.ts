import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api/apiClient";

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = { requires2FA: boolean };

async function login(payload: LoginPayload): Promise<LoginResponse> {
    // Perform a POST request to the login API endpoint
    const response = await apiFetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    // If response is not OK, extract error message and throw
    // This allows React Query to handle it in onError callbacks
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }
    // On success, return the parsed JSON response
    return response.json();
}

export function useLoginMutation() {
    // useMutation is used for POST/PUT/DELETE (non-GET) operations.
    // Here it wraps the login function so components can call mutate()
    // and handle success/error states automatically.
    return useMutation({ mutationFn: login });
}