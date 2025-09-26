import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

type Props = {
    children: ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
    return (
        // Provides the React Query context to the entire component tree,
        // enabling all hooks (useQuery, useMutation, etc.) to share the same QueryClient
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Devtools */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};