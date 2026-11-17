import * as Nixia from './index';
import mus from './testmusic.mp3';

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
}

class MyLevel extends Nixia.Level {
    constructor() {
        super("MyLevel");
    }

    override awake() {
        super.awake();

        this.root.add(new MyActor());

        const circle = new Nixia.Actor();
        circle.transform.position = new Nixia.Vector2(220, 40);
        circle.transform.scale = new Nixia.Vector2(100, 100);
        circle.registerComponent(new Nixia.PhysicsComponent(
            circle,
            this.physicsEngine,
            { shape: "circle", body: { restitution: 0.4 } }
        ));
        circle.registerComponent(new Nixia.RenderComponent(
            circle,
            Nixia.RenderBuffer_Type.Circle,
            Nixia.Transform.ZERO,
            { color: [0.1, 0.55, 0.95, 1] }
        ));
        this.root.add(circle);

        const ground = new Nixia.Actor();
        ground.transform.position = new Nixia.Vector2(0, 360);
        ground.transform.scale = new Nixia.Vector2(600, 40);
        ground.registerComponent(new Nixia.PhysicsComponent(
            ground,
            this.physicsEngine,
            { body: { isStatic: true } }
        ));
        ground.registerComponent(new Nixia.RenderComponent(
            ground,
            Nixia.RenderBuffer_Type.Rectangle,
            Nixia.Transform.ZERO,
            { color: [0.35, 0.35, 0.35, 1] }
        ));
        this.root.add(ground);
    }
}

const level = new MyLevel();
const app = new Nixia.Application();
app.setDefaultLevel(level);
app.start();

const audio = new Audio(mus);
document.body.onclick = function() {
    audio.play();
};