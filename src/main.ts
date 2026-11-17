import * as Nixia from './index';

class MyActor extends Nixia.Actor {
    constructor() {
        super();

        this.transform.position = new Nixia.Vector2(
            20, 20
        );

        this.transform.scale = new Nixia.Vector2(
            150, 150
        );

        this.registerComponent(new Nixia.RenderComponent(
            this,
            Nixia.RenderBuffer_Type.Rectangle,
            Nixia.Transform.ZERO
        ));
    }

    override awake() {
        super.awake();
    }

    override tick(dt: number) {
        super.tick(dt);
    }
}

class MyLevel extends Nixia.Level {
    constructor() {
        super("MyLevel");
    }

    override awake() {
        super.awake();

        this.root.add(new MyActor());
    }
}

const level = new MyLevel();
const app = new Nixia.Application();
app.setDefaultLevel(level);
app.start();