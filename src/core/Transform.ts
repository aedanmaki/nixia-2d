// src/core/Transform.ts
import { Vector2 } from "./Vector2";
import { Rotator } from "./Rotator";

/**
 * Represents a Transform.
 * 
 * A transform is an object containing position, rotation and scale information.
 */
export class Transform {
    /**
     * Position.
     */
    public position: Vector2;

    /**
     * Rotation.
     */
    public rotation: Rotator;

    /**
     * Scale.
     */
    public scale: Vector2;

    /**
     * Creates a new Transform.
     * 
     * @param {Vector2} position - Position.
     * @param {Rotator} rotation - Rotation.
     * @param {Vector2} scale - Scale.
     */
    constructor(position: Vector2, rotation: Rotator, scale: Vector2) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
}