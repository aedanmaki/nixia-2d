// src/core/RenderBuffer.ts
import { Transform } from "./Transform";

export enum RenderBuffer_Type {
    Rectangle = "Rectangle"
}

/**
 * Represents a Render Buffer.
 */
export class RenderBuffer {
    /**
     * The buffer type.
     */
    public bufferType: RenderBuffer_Type;

    /**
     * The buffer transform.
     */
    public transform: Transform;

    /**
     * Creates a new Render Buffer.
     * 
     * @param {RenderBuffer_Type} type The buffer type.
     * @param {Transform} transform - Buffer transform.
     */
    constructor(type: RenderBuffer_Type, transform: Transform) {
        this.bufferType = type;
        this.transform = transform;
    }
}