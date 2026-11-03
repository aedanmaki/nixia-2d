import { Application } from "./core/Application";

declare global {
    interface Window {
        app: Application
    }

    enum RenderBuffer_Type {
        Rectangle = "Rectangle"
    }
}

export {};