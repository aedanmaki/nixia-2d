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
    }

    /**
     * Completely clears the canvas.
     */
    clear() {
        
    }

    /**
     * Draws the buffers onto the canvas.
     */
    draw() {

    }
}