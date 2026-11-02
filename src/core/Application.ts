// src/core/Application.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";
import { Renderer } from "./Renderer";

/**
 * Represents an Application.
 */
export class Application extends Base {
    /**
     * If the game has already been initialized.
     */
    private wasInitialized: boolean = false;

    /**
     * Previous tick time.
     */
    private previousTickTime: number = Date.now();

    /**
     * An array of every tickable instance.
     */
    private tickableInstances: ITickable[] = [];

    /**
     * The renderer instance.
     */
    private renderer: Renderer;

    /**
     * Creates a new Application.
     */
    constructor() {
        super();

        this.renderer = new Renderer();
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
        const now = Date.now();
        const delta = now - this.previousTickTime;

        const len = this.tickableInstances.length;
        for (let i = 0; i < len; i++) {
            const inst = this.tickableInstances[i];
            inst.tick(delta);
        }

        this.renderer.clear();
        this.renderer.draw();

        this.previousTickTime = now;

        requestAnimationFrame(this._tick);
    }
}