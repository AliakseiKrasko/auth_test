import {QueryProvider, RouterProvider} from "@/app/providers";
import {AuthProvider} from "@/shared/auth/AuthContext.tsx";


export const App = () => {
    return (
        <QueryProvider>
            <AuthProvider>
                <RouterProvider />
            </AuthProvider>
        </QueryProvider>
    );
};