import * as Nixia from './index';
import { MyLevel } from './test/MyLevel';

const app = new Nixia.Application();

app.setDefaultLevel(new MyLevel());

app.start();