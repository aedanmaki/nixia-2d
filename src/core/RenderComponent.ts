import { Actor } from "./Actor";
import { Component } from "./Component";
import { RenderBuffer, RenderBufferOptions, RenderBuffer_Type } from "./RenderBuffer";
import { Transform } from "./Transform";

export class RenderComponent extends Component {
    public buffer: RenderBuffer;
    private readonly relativeTransform: Transform;

    constructor(
        owner: Actor,
        type: RenderBuffer_Type,
        relativeTransform: Transform,
        options: RenderBufferOptions = {}
    ) {
        super(owner);

        this.relativeTransform = relativeTransform.clone();
        this.buffer = new RenderBuffer(type, this.getRenderTransform(), options);
    }

    override awake() {
        super.awake();

        window.app.getRenderer().buffers.push(this.buffer);
    }

    override tick(dt: number) {
        super.tick(dt);

        this.buffer.transform = this.getRenderTransform();
    }

    private getRenderTransform(): Transform {
        const transform = this.owner.transform.clone();
        transform.add(this.relativeTransform);
        return transform;
    }
}