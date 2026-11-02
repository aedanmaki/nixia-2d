#!/usr/bin/env node
// i suck at coding
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
if (args[0] === 'init') {
    const path_dir_src = path.join("src");
    const path_file_vite = path.join("vite.config.ts");
    const path_file_tsconfig = path.join("tsconfig.json");

    if (fs.existsSync(path_dir_src)) throw new Error(`src directory already exists.`);
    fs.mkdirSync(path_dir_src);

    fs.writeFileSync(path_file_tsconfig, JSON.stringify({
        "compilerOptions": {
            "target": "ESNext",
            "useDefineForClassFields": true,
            "module": "ESNext",
            "moduleResolution": "bundler",
            "isolatedModules": true,
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noImplicitReturns": true,
            "skipLibCheck": true,
            "resolveJsonModule": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "types": ["vite/client"]
        },
        "include": ["src/**/*", "vite.config.ts"]
    }), null, 2);

    fs.writeFileSync(path_file_vite, `import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
    plugins: [viteSingleFile()],
    build: {
        target: 'esnext',
        assetsInlineLimit: 100000000,
        chunkSizeWarningLimit: 100000000,
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
    },
});`);
fs.writeFileSync(path.join("src", "main.ts"), ``);
fs.writeFileSync(path.join("index.html", `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nixia 2D</title>
    </head>
    <body>
        <script type="module" src="./src/main.ts"></script>
    </body>
</html>`));
}

console.log('Finish script');