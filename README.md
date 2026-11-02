# NIXIA 2D Game Engine
This is the 2D version of the Nixia Game Engine. It is written entirely in TypeScript and is designed to run on low power machines.

## How to get started
Getting started with Nixia is very simple.
1.  Initialize your environment
```bash
mkdir my-game
cd my-game
```
<br>

2. Install the NIXIA package (this will also install vite and other required dependancies)
```bash
npm install -d @nixia/2d
```
<br>

3. Initialize NIXIA with the CLI
```bash
nixia init
```
<br>
Once you've done that, you are ready to begin coding.
Your application's entry point is located at <b>src/main.ts</b>


<br>

## Creating your first Level
To create a new level, create a new TypeScript file in <b>src/levels/MyLevel.ts</b>. You can then extend off of the Level class and begin editing.
```ts
// src/levels/MyLevel.ts
import * as NIXIA from '@nixia/2d';

export class MyLevel extends NIXIA.Level {
  constructor() {
    super("MyLevel");
  }
}
```

## Creating your first Actor
Actors represent game objects, or more specifically game objects inside a level. They can have components, code, physics, etc. You can create one like this:
```ts
// src/actors/MyActor.ts
import * as NIXIA from '@nixia/2d';

export class MyActor extends NIXIA.Actor {
  constructor() {
    super("MyActor");
  }
}
```