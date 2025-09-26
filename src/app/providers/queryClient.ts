import { QueryClient } from "@tanstack/react-query";


// Create a single instance of QueryClient to manage all queries and caching
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});