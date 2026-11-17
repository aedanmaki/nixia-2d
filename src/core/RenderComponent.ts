import { Actor } from "./Actor";
import { Component } from "./Component";
import { RenderBuffer, RenderBuffer_Type } from "./RenderBuffer";
import { Transform } from "./Transform";

export class RenderComponent extends Component {
    public buffer: RenderBuffer;

    constructor(owner: Actor, type: RenderBuffer_Type, relativeTransform: Transform) {
        super(owner);
        
        const tTransform: Transform = owner.transform;
        tTransform.add(relativeTransform);
        this.buffer = new RenderBuffer(
            type,
            tTransform
        );
    }

    override awake() {
        super.awake();

        window.app.getRenderer().buffers.push(this.buffer);
    }

    override tick(dt: number) {
        super.tick(dt);

        this.buffer.transform = this.owner.transform;
    }
}