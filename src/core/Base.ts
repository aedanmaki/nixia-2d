// src/core/Base.ts

/**
 * Base class containing code for replication and events.
 */
export abstract class Base {
    private events: Map<string, Function[]> = new Map();

    on(event: string, callback: Function) {
        const callbacks = this.events.get(event);
        if (!callbacks) this.events.set(event, [callback]); else {
            callbacks.push(callback);
            this.events.set(event, callbacks);
        }
    }

    fire(event: string) {
        const callbacks = this.events.get(event);
        if (!callbacks) return;
        const len = callbacks.length;
        for (let i = 0; i < len; i++) {
            callbacks[i]();
        }
    }
}