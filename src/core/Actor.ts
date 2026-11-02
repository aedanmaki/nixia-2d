// src/core/Actor.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";

/**
 * Represents an Actor.
 */
export class Actor extends Base implements ITickable {
    /**
     * Creates a new Actor.
     */
    constructor() {
        super();
    }

    /**
     * Called on tick.
     */
    tick(dt: number): void {}
}