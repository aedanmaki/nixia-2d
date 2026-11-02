# 🎮 NIXIA 2D Game Engine
> A lightning-fast, lightweight 2D game engine written entirely in TypeScript, engineered from the ground up to run seamlessly on low-power machines and resource-constrained devices.

---

## 🚀 Getting Started

Getting your first Nixia project up and running takes less than a minute. Follow these simple steps:

### 1. Initialize your workspace
Create a new directory for your game and step into it:
```bash
mkdir my-game
cd my-game
```

### 2. Install the core package
Install the NIXIA package as a development dependency (this automatically pulls in Vite and all other required toolchain dependencies):
```bash
npm install -D @nixia/2d
```

### 3. Initialize your project structure
Run the built-in CLI tool to scaffold your configuration files and entry point:
```bash
nixia init
```

Once initialization is complete, you are ready to write code! Your application's main entry point is located at `src/main.ts`

## 🏗️ Creating Your First Level
Levels represent the scenes or stages of your game. To create a new level, generate a new TypeScript file inside `src/levels/MyLevel.ts`, extend the core `Nixia.Level` class, and configure it:

```ts
// src/levels/MyLevel.ts
import * as Nixia from '@nixia/2d';

export class MyLevel extends Nixia.Level {
  constructor() {
    super("MyLevel");
  }
}
```

Then in your `src/main.ts`, you can make this your default level by using the following code:
```ts
// src/main.ts
import * as Nixia from '@nixia/2d';
import { MyLevel } from './levels/MyLevel';

// Preload your level
const myLevel = new MyLevel();

// Create a new Application
const app = new Nixia.Application();

// Set the default level to our custom level
app.setDefaultLevel(myLevel);

// Start the application
app.start();
```

## 👾 Creating Your First Actor
Actors represent game objects—or more specifically, active entities living inside a level. They handle components, custom game logic, rendering, physics, and more. You can create one like this:

```ts
// src/actors/MyActor.ts
import * as Nixia from '@nixia/2d';

export class MyActor extends Nixai.Actor {
  constructor() {
    super("MyActor");
  }
}
```

You can add your Actor to your Level like this:
```ts
// src/levels/MyLevel.ts
import * as Nixia from '@nixia/2d';
import { MyActor } from './actors/MyActor';

export class MyLevel extends Nixia.Level {
  constructor() {
    super("MyLevel");

    // This both adds the actor to the scene and registers it with
    // the game lifecycle.
    this.root.add(new MyActor(this, this.app));
  }
}