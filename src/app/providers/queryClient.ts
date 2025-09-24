import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1, // одна повторная попытка при ошибке
            refetchOnWindowFocus: false, // не рефетчить при фокусе окна
        },
    },
});