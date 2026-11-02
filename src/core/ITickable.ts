// src/core/ITickable.ts

export interface ITickable {
    tick(dt: number): void;
}