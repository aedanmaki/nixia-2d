// src/apps/Application.ts
import { Base } from "../core/Base";

/**
 * Represents an Application.
 */
export class Application extends Base {
    /**
     * If the game has already been initialized.
     */
    private wasInitialized: boolean = false;

    /**
     * Creates a new Application.
     */
    constructor() {
        super();
    }

    /**
     * Initialize the Application.
     */
    init() {
        if (this.wasInitialized) throw new Error('Application is already initialized.');
        this.wasInitialized = true;

        if (document.readyState === 'complete') {
            this._ready();
        } else {
            window.addEventListener('load', () => {
                this._ready();
            });
        }
    }

    /**
     * Called when the game is ready.
     */
    private _ready() {
        this.fire('ready');

        requestAnimationFrame(this._tick);
    }

    /**
     * Called on tick.
     */
    private _tick = () => {
        requestAnimationFrame(this._tick);
    }
}