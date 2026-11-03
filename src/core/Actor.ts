// src/core/Actor.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";
import { IAwakable } from "./IAwakable";
import { Transform } from "./Transform";
import { Vector2 } from "./Vector2";
import { Rotator } from "./Rotator";
import { Component } from "./Component";

/**
 * Represents an Actor.
 */
export class Actor extends Base implements ITickable, IAwakable {
    /**
     * Actor Transform.
     */
    public transform: Transform;

    /**
     * A list of all components.
     */
    private components: Component[] = [];

    /**
     * Actor children.
     */
    private children: Actor[] = [];

    /**
     * Actor parent.
     */
    public parent: Actor|undefined = undefined;

    /**
     * Creates a new Actor.
     */
    constructor() {
        super();

        this.transform = new Transform(
            new Vector2(0, 0),
            new Rotator(0),
            new Vector2(1, 1)
        );
    }

    /**
     * Registers a component.
     * 
     * @param {Component} componentToRegister The component to be registered.
     */
    public registerComponent(componentToRegister: Component): void {
        if (this.components.includes(componentToRegister)) return;
        componentToRegister.owner = this;
        this.components.push(componentToRegister);
    }

    /**
     * Called on tick.
     * 
     * @param {number} dt Delta Time
     */
    public tick(dt: number): void {
        const len = this.components.length;
        for (let i = 0; i < len; i++) {
            const component = this.components[i];
            component.tick(dt);
        }
    }

    /**
     * Awake.
     */
    public awake(): void {
        this.fire('awake');
        const len = this.components.length;
        for (let i = 0; i < len; i++) {
            const component = this.components[i];
            component.awake();
        }
    }

    /**
     * Get children.
     */
    public getChildren(): Actor[] {
        return this.children;
    }

    /**
     * Add child.
     * 
     * @param {Actor} child Child actor to add.
     */
    public addChild(child: Actor): void {
        if (this.children.includes(child)) return;
        this.children.push(child);
        child.parent = this;
    }

    /**
     * Remove child.
     * 
     * @param {Actor} childToRemove The child to be removed.
     */
    public removeChild(childToRemove: Actor): void {
        this.children = this.children.filter(i => i != childToRemove);
    }
}