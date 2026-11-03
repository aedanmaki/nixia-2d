// src/core/Component.ts
import { ITickable } from "./ITickable";
import { IAwakable } from "./IAwakable";
import { Base } from "./Base";
import { Actor } from "./Actor";

export class Component extends Base implements ITickable, IAwakable {
    /**
     * The owning actor.
     */
    public owner: Actor;

    /**
     * Creates a new Component.
     * 
     * @param {Actor} owner Owning actor.
     */
    constructor(owner: Actor) {
        super();
        
        this.owner = owner;
    }

    /**
     * Called on tick.
     * 
     * @param {number} dt Delta Time
     */
    public tick(dt: number): void {
        // ...
    }

    /**
     * Awake.
     */
    public awake(): void {
        this.fire('awake');
    }
}