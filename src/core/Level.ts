 // src/core/Level.ts
import { Base } from "./Base";
import { ITickable } from "./ITickable";
import { IAwakable } from "./IAwakable";
import { LevelRoot } from "./LevelRoot";
import { Application } from "./Application";
import Matter, { Engine } from 'matter-js';

const PHYSICS_STEP_MS = 1000 / 60;
const MAX_PHYSICS_SUBSTEPS = 5;
const MAX_PHYSICS_FRAME_MS = PHYSICS_STEP_MS * MAX_PHYSICS_SUBSTEPS;

/**
 * Represents a Level.
 */
export class Level extends Base implements ITickable, IAwakable {
    /**
     * The level name.
     */
    public readonly name: string;

    /**
     * The level root.
     */
    public readonly root: LevelRoot;

    /**
     * Matter physics engine.
     */
    public readonly physicsEngine: Matter.Engine;

    private physicsAccumulator = 0;

    /**
     * Creates a new Level.
     * 
     * @param {string} name The level name.
     */
    constructor(name: string) {
        super();

        this.name = name;
        this.root = new LevelRoot(this);
        this.physicsEngine = Engine.create();
    }

    /**
     * Awake.
     */
    public awake(): void {
        this.fire('awake');
    }

    /**
     * Called on tick.
     * 
     * @param {number} dt Delta Time
     */
    public tick(dt: number): void {
        const elapsed = Number.isFinite(dt) ? Math.max(0, Math.min(dt, MAX_PHYSICS_FRAME_MS)) : 0;
        this.physicsAccumulator += elapsed;

        let substeps = 0;
        while (this.physicsAccumulator >= PHYSICS_STEP_MS && substeps < MAX_PHYSICS_SUBSTEPS) {
            Engine.update(this.physicsEngine, PHYSICS_STEP_MS);
            this.physicsAccumulator -= PHYSICS_STEP_MS;
            substeps++;
        }

        this.root.tick(dt);
    }
}