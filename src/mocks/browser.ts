import { handlers } from "./handlers";
import {setupWorker} from "msw/browser";

// Launching Service Worker
export const worker = setupWorker(...handlers);