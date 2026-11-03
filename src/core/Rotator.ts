// src/core/Rotator.ts

/**
 * Represents a Rotation in degrees.
 */
export class Rotator {
    /**
     * Rotation in degrees.
     */
    public deg: number;

    /**
     * Creates a new Rotator.
     * 
     * @param {number} deg - Rotation in degrees.
     */
    constructor(deg: number) {
        if (deg < -360 || deg > 360) throw new RangeError(`Value is not a valid rotation.`);
        this.deg = deg;
    }
}