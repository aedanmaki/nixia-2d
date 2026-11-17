import Matter from "matter-js";
import { Actor } from "./Actor";
import { Component } from "./Component";

export type PhysicsShape = "rectangle" | "circle";

export interface PhysicsComponentOptions {
    shape?: PhysicsShape;
    width?: number;
    height?: number;
    radius?: number;
    body?: Omit<Matter.IChamferableBodyDefinition, "position">;
}

/**
 * Adds a Matter.js rigid body and synchronizes its position and rotation to an actor.
 */
export class PhysicsComponent extends Component {
    public readonly body: Matter.Body;

    private readonly engine: Matter.Engine;
    private readonly offsetX: number;
    private readonly offsetY: number;
    private isAdded = false;

    constructor(owner: Actor, engine: Matter.Engine, options: PhysicsComponentOptions = {}) {
        super(owner);
        this.engine = engine;

        const width = options.width ?? owner.transform.scale.x;
        const height = options.height ?? owner.transform.scale.y;
        this.validateDimension(width, "width");
        this.validateDimension(height, "height");

        const shape = options.shape ?? "rectangle";
        const radius = options.radius ?? Math.min(width, height) / 2;
        if (shape === "circle") {
            this.validateDimension(radius, "radius");
            this.offsetX = width / 2;
            this.offsetY = height / 2;
        } else {
            this.offsetX = width / 2;
            this.offsetY = height / 2;
        }

        const x = owner.transform.position.x + this.offsetX;
        const y = owner.transform.position.y + this.offsetY;
        const bodyOptions = {
            ...options.body,
            angle: options.body?.angle ?? owner.transform.rotation.deg * Math.PI / 180
        };

        this.body = shape === "circle"
            ? Matter.Bodies.circle(x, y, radius, bodyOptions)
            : Matter.Bodies.rectangle(x, y, width, height, bodyOptions);
    }

    override awake(): void {
        super.awake();
        if (this.isAdded) return;

        Matter.Composite.add(this.engine.world, this.body);
        this.isAdded = true;
    }

    override tick(dt: number): void {
        super.tick(dt);
        if (!this.isAdded) return;

        this.owner.transform.position.x = this.body.position.x - this.offsetX;
        this.owner.transform.position.y = this.body.position.y - this.offsetY;
        const degrees = this.body.angle * 180 / Math.PI;
        this.owner.transform.rotation.deg = ((degrees + 180) % 360 + 360) % 360 - 180;
    }

    public dispose(): void {
        if (!this.isAdded) return;

        Matter.Composite.remove(this.engine.world, this.body);
        this.isAdded = false;
    }

    private validateDimension(value: number, name: string): void {
        if (!Number.isFinite(value) || value <= 0) {
            throw new RangeError(`Physics body ${name} must be a positive finite number.`);
        }
    }
}
