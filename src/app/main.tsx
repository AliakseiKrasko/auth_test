import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '../index.css'
import {App} from "@/app/App.tsx";

// In development mode only, start the MSW (Mock Service Worker).
// This intercepts network requests and serves mock responses,
// useful for local testing without needing a real backend.
if (import.meta.env.DEV) {
    const { worker } = await import("@/mocks/browser");
    worker.start();
}

// Create a root and render the app wrapped in React.StrictMode.
// StrictMode enables extra checks and warnings in development.
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
