// src/core/RenderBuffer.ts
import { Transform } from "./Transform";

export enum RenderBuffer_Type {
    Rectangle = "Rectangle",
    Circle = "Circle",
    Image = "Image"
}

export type RenderColor = readonly [number, number, number, number];

export interface RenderBufferOptions {
    color?: RenderColor;
    imageSource?: string;
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
     * RGBA tint with each channel in the range 0-1.
     */
    public readonly color: RenderColor;

    /**
     * URL or data URL for image buffers.
     */
    public readonly imageSource?: string;

    /**
     * Creates a new Render Buffer.
     * 
     * @param {RenderBuffer_Type} type The buffer type.
     * @param {Transform} transform - Buffer transform.
     * @param {RenderBufferOptions} options Rendering options.
     */
    constructor(type: RenderBuffer_Type, transform: Transform, options: RenderBufferOptions = {}) {
        if (type === RenderBuffer_Type.Image && !options.imageSource) {
            throw new Error("Image render buffers require an image source.");
        }

        const defaultColor: RenderColor = type === RenderBuffer_Type.Image
            ? [1, 1, 1, 1]
            : [0.149, 0.149, 0.149, 1];
        const color = options.color ?? defaultColor;
        if (color.some(channel => !Number.isFinite(channel) || channel < 0 || channel > 1)) {
            throw new RangeError("Render color channels must be between 0 and 1.");
        }

        this.bufferType = type;
        this.transform = transform;
        this.color = color;
        this.imageSource = options.imageSource;
    }
}