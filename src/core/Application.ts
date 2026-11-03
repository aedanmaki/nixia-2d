// src/core/Application.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";
import { Renderer } from "./Renderer";
import { Level } from "./Level";

/**
 * Represents an Application.
 */
export class Application extends Base {
    /**
     * If the game has already been initialized.
     */
    private wasInitialized: boolean = false;

    /**
     * If the game is ready.
     */
    private isReady: boolean = false; 

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
     * The default level.
     */
    private defaultLevel!: Level;

    /**
     * Creates a new Application.
     */
    constructor() {
        super();

        this.renderer = new Renderer();
    }

    /**
     * Starts the Application.
     */
    public start(): void {
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
    private _ready(): void {
        this.isReady = true;
        if (!this.defaultLevel) throw new Error("No default level was assigned, cannot create game.");
        this.fire('ready');
        this.defaultLevel.awake();

        requestAnimationFrame(this._tick);
    }

    /**
     * Called on tick.
     */
    private _tick = (): void => {
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

    /**
     * Sets the default level.
     * 
     * @param {Level} defaultLevel The level to be assigned as the default level.
     */
    public setDefaultLevel(defaultLevel: Level): void {
        if (this.isReady) throw new Error("Cannot assign a default level when the game is already running.");
        this.defaultLevel = defaultLevel;
    }
}