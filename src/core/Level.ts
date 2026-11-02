// src/core/Level.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";

/**
 * Represents a Level.
 */
export class Level extends Base implements ITickable {
    /**
     * Creates a new Level.
     */
    constructor() {
        super();
    }

    /**
     * Called on tick.
     */
    tick(dt: number): void {}
}