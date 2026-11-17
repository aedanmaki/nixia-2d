// src/core/Renderer.ts
import { Base } from "./Base";
import { RenderBuffer, RenderBuffer_Type } from "./RenderBuffer";
import { Vector2 } from "./Vector2";
import { Rotator } from "./Rotator";
import { Transform } from "./Transform";

/**
 * Represents a Renderer.
 */
export class Renderer extends Base {
    /**
     * The canvas element.
     */
    private canvas: HTMLCanvasElement;

    /**
     * The rendering context.
     */
    private ctx: CanvasRenderingContext2D;

    /**
     * Render buffers.
     */
    public buffers: RenderBuffer[] = [];

    /**
     * Creates a new Renderer.
     */
    constructor() {
        super();

        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        this.canvas = canvas;
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.canvas.style.border = "1px solid black";
        document.body.appendChild(this.canvas);
        const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.ctx = ctx;
        this.ctx.fillStyle = '#262626';
    }

    /**
     * Completely clears the canvas.
     */
    public clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the buffers onto the canvas.
     */
    public draw() {
        console.log('draw');
        const buffers = this.buffers;
        const len = buffers.length;

        for (let i = 0; i < len; i++) {
            const buffer = buffers[i];
            if (buffer.bufferType === RenderBuffer_Type.Rectangle) {
                const position: Vector2 = buffer.transform.position;
                const rotation: Rotator = buffer.transform.rotation;
                const scale: Vector2 = buffer.transform.scale;

                this.ctx.fillRect(
                    position.x,
                    position.y,
                    scale.x,
                    scale.y
                );
            }
        }
    }
}