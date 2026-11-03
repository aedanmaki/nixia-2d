// src/core/Base.ts

/**
 * Base class containing code for replication and events.
 */
export abstract class Base {
    private events: Map<string, Function[]> = new Map();

    /**
     * Bind event to function callback.
     * 
     * @param {string} event Event name.
     * @param {Function} callback Callback function.
     * @returns {void}
     */
    public on(event: string, callback: Function): void {
        const callbacks = this.events.get(event);
        if (!callbacks) this.events.set(event, [callback]); else {
            callbacks.push(callback);
            this.events.set(event, callbacks);
        }
    }

    /**
     * Calls an event.
     * 
     * @param {string} event Event name.
     * @returns {void}
     */
    public fire(event: string): void {
        const callbacks = this.events.get(event);
        if (!callbacks) return;
        const len = callbacks.length;
        for (let i = 0; i < len; i++) {
            callbacks[i]();
        }
    }
}