// src/core/Level.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";

/**
 * Represents a Level.
 */
export class Level extends Base implements ITickable {
    /**
     * The level name.
     */
    private name: string;

    /**
     * Creates a new Level.
     */
    constructor(name: string) {
        super();

        this.name = name;
    }

    /**
     * Called on tick.
     */
    tick(dt: number): void {}
}