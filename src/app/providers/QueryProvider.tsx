import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

type Props = {
    children: ReactNode;
};

export const QueryProvider = ({ children }: Props) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};