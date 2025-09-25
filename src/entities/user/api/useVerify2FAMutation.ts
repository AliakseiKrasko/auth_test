import { useMutation } from "@tanstack/react-query";
import { verify2FA } from "./verify2FA";

export function useVerify2FAMutation() {
    return useMutation({ mutationFn: verify2FA });
}