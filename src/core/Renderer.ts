// src/core/Renderer.ts
import { Base } from "./Base";

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
    }

    /**
     * Completely clears the canvas.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the buffers onto the canvas.
     */
    draw() {

    }
}