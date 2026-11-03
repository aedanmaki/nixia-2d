// src/core/LevelRoot.ts
import { Level } from "./Level";
import { Actor } from "./Actor";
import { ITickable } from "./ITickable";
import { Base } from "./Base";

export class LevelRoot extends Base implements ITickable {
    /**
     * Owning level.
     */
    private owningLevel: Level;

    /**
     * All contained actors.
     */
    private actors: Actor[] = [];

    /**
     * Creates a new Level Root.
     * 
     * @param {Level} owningLevel The owning level
     */
    constructor(owningLevel: Level) {
        super();
        
        this.owningLevel = owningLevel;
    }

    /**
     * Adds an actor to the level.
     * 
     * @param {Actor} actorToAdd The actor to be added.
     */
    public add(actorToAdd: Actor): void {
        this.actors.push(actorToAdd);
        actorToAdd.awake();
    }

    /**
     * Called on tick.
     * 
     * @param {number} dt Delta Time
     */
    public tick(dt: number): void {
        const len = this.actors.length;
        for (let i = 0; i < len; i++) {
            const actor = this.actors[i];
            actor.tick(dt);
        }
    }
}