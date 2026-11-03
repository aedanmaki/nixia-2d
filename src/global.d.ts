import { Application } from "./core/Application";

declare global {
    interface Window {
        app: Application
    }
}

export {};