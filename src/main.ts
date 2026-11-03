import * as Nixia from './index';

class MyActor extends Nixia.Actor {
    constructor() {
        super();
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

        alert("Hello, world!");
    }
}

const level = new MyLevel();
const app = new Nixia.Application();
app.setDefaultLevel(level);
app.start();