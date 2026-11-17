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

    /**
     * Clones this Transform.
     * 
     * @returns {Transform}
     */
    clone(): Transform {
        return new Transform(
            this.position.clone(),
            new Rotator(this.rotation.deg),
            this.scale.clone()
        );
    }

    /**
     * Adds a transform to this transform
     * 
     * @param {Transform} t1
     * @param {Transform} t2
     * @returns {Transform}
     */
    add(t1: Transform): void {
        this.position.add(t1.position);
        this.scale.add(t1.scale);
        this.rotation = new Rotator((this.rotation.deg + t1.rotation.deg) % 360);
    }

    static ZERO: Transform = new Transform(
            new Vector2(0, 0),
            new Rotator(0),
            new Vector2(0, 0)
        );
}