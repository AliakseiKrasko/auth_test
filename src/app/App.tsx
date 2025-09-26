import {QueryProvider, RouterProvider} from "@/app/providers";
import {AuthProvider} from "@/shared/auth/AuthContext.tsx";


export const App = () => {
    return (
        // Provides React Query context (caching, API requests)
        <QueryProvider>
            {/* Provides authentication context (access token, login state) */}
            <AuthProvider>
                {/* Provides routing context (navigation between pages) */}
                <RouterProvider />
            </AuthProvider>
        </QueryProvider>
    );
};