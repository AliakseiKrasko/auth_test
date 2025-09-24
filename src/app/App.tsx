import {QueryProvider, RouterProvider} from "@/app/providers";


export const App = () => {
    return (
        <QueryProvider>
            <RouterProvider />
        </QueryProvider>
    );
};