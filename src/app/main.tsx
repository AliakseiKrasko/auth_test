import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '../index.css'
import {App} from "@/app/App.tsx";
import {worker} from "@/mocks/browser.ts";

// Running mocks before rendering the app
if (import.meta.env.DEV) {
    worker.start({ onUnhandledRequest: "warn" });
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
