// src/core/RenderBuffer.ts

/**
 * Represents a Render Buffer.
 */
export class RenderBuffer {
    /**
     * The buffer type.
     */
    public bufferType: RenderBuffer_Type;

    /**
     * Creates a new Render Buffer.
     * 
     * @param {RenderBuffer_Type} type The buffer type.
     */
    constructor(type: RenderBuffer_Type) {
        this.bufferType = type;
    }
}