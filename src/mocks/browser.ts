import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Launching Service Worker
export const worker = setupWorker(...handlers);