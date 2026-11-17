 // src/core/Level.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";
import { IAwakable } from "./IAwakable";
import { LevelRoot } from "./LevelRoot";
import { Application } from "./Application";
import Matter, { Engine } from 'matter-js';

/**
 * Represents a Level.
 */
export class Level extends Base implements ITickable, IAwakable {
    /**
     * The level name.
     */
    public readonly name: string;

    /**
     * The level root.
     */
    public readonly root: LevelRoot;

    /**
     * Matter physics engine.
     */
    public readonly physicsEngine: Matter.Engine;

    /**
     * Creates a new Level.
     * 
     * @param {string} name The level name.
     */
    constructor(name: string) {
        super();

        this.name = name;
        this.root = new LevelRoot(this);
        this.physicsEngine = Engine.create();
    }

    /**
     * Awake.
     */
    public awake(): void {
        this.fire('awake');
    }

    /**
     * Called on tick.
     * 
     * @param {number} dt Delta Time
     */
    public tick(dt: number): void {
        this.root.tick(dt);
    }
}