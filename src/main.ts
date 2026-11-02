import * as NIXIA from './index';

const app = new NIXIA.Application();
app.on('ready', () => {
    alert('Hello, world!');
});
app.init();