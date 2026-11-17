// src/core/Vector2.ts

/**
 * Represents a 2-Dimensional vector.
 */
export class Vector2 {
    /**
     * Creates a new Vector2
     * 
     * @param {number} x - X coordinate.
     * @param {number} y - Y coordinate.
     */
    constructor(
        public x: number,
        public y: number
    ) {}

    /**
     * Clones this Vector2
     * 
     * @returns {Vector2}
     */
    clone(): Vector2 {
        return new Vector2(
            this.x,
            this.y
        );
    }

    /**
     * Adds a Vector2 to this Vector2.
     * 
     * @param {Vector2} vectorToAdd
     */
    add(vectorToAdd: Vector2): void {
        this.x += vectorToAdd.x;
        this.y += vectorToAdd.y;
    }
}