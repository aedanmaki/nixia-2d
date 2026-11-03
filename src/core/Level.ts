// src/core/Level.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";
import { IAwakable } from "./IAwakable";
import { LevelRoot } from "./LevelRoot";

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
     * Creates a new Level.
     * 
     * @param {string} name The level name.
     */
    constructor(name: string) {
        super();

        this.name = name;
        this.root = new LevelRoot(this);
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