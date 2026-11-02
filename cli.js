#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = "https://nixia-2d-cli.nakoyasoftware.com/components/";

// Define all components in a single configuration array to maintain DRY principles
const COMPONENTS = [
    { name: "index.html", dest: "index.html" },
    { name: "vite.config.ts", dest: "vite.config.ts" },
    { name: "tsconfig.json", dest: "tsconfig.json" },
    { name: "main.ts", dest: path.join("src", "main.ts") }
];

/**
 * Generic helper function to download any file from the remote components repository.
 */
async function downloadFile(filename) {
    try {
        const response = await fetch(`${BASE_URL}${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return await response.text();
    } catch (e) {
        throw new Error(`Failed to download '${filename}': ${e.message}`);
    }
}

async function runCli() {
    console.log('🔍 Running pre-flight environment checks...');

    // Centralized pre-flight checks to prevent accidental overwrites
    const existenceChecks = [
        { target: "src", message: "Error: The 'src/' directory already exists. Aborting to protect your files." },
        { target: "tsconfig.json", message: "Error: 'tsconfig.json' already exists in this directory." },
        { target: "vite.config.ts", message: "Error: 'vite.config.ts' already exists in this directory." }
    ];

    for (const check of existenceChecks) {
        if (fs.existsSync(check.target)) {
            throw new Error(check.message);
        }
    }
    console.log('✅ Pre-flight checks passed successfully!');

    console.log('🚀 Downloading project components from remote server...');
    const downloadedContent = {};

    // Loop through our configuration array instead of writing duplicate functions
    for (let i = 0; i < COMPONENTS.length; i++) {
        const component = COMPONENTS[i];
        console.log(`📥 Downloading component ${i + 1} of ${COMPONENTS.length}: ${component.name}...`);
        downloadedContent[component.name] = await downloadFile(component.name);
    }

    console.log('💾 Writing files to disk...');
    
    // Ensure the src directory exists before writing nested files
    fs.mkdirSync("src", { recursive: true });

    // Write all downloaded files to their respective destinations
    fs.writeFileSync("index.html", `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nixia Engine Default Game</title>
    </head>
    <body>
        <script type="module" src="./src/main.ts"></script>
    </body>
</html>`);
fs.writeFileSync(JSON.stringify({
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
fs.writeFileSync("vite.config.ts", `
import { defineConfig } from 'vite';
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
        },#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

async function runCli() {
    console.log('🔍 Running pre-flight environment checks...');

    // Centralized pre-flight checks to prevent accidental overwrites
    const existenceChecks = [
        { target: "src", message: "Error: The 'src/' directory already exists. Aborting to protect your files." },
        { target: "tsconfig.json", message: "Error: 'tsconfig.json' already exists in this directory." },
        { target: "vite.config.ts", message: "Error: 'vite.config.ts' already exists in this directory." }
    ];

    for (const check of existenceChecks) {
        if (fs.existsSync(check.target)) {
            throw new Error(check.message);
        }
    }
    console.log('✅ Pre-flight checks passed successfully!');

    console.log('💾 Creating project structure and writing files locally...');
    
    // Ensure the src directory exists before writing nested files
    fs.mkdirSync("src", { recursive: true });

    // 1. Write index.html
    const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nixia Engine Default Game</title>
    </head>
    <body>
        <script type="module" src="./src/main.ts"></script>
    </body>
</html>`;
    fs.writeFileSync("index.html", indexHtmlContent);
    console.log('📄 Created index.html successfully!');

    // 2. Write tsconfig.json (Fixed the missing filename bug!)
    const tsConfigData = {
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
    };
    fs.writeFileSync("tsconfig.json", JSON.stringify(tsConfigData, null, 2));
    console.log('📄 Created tsconfig.json successfully!');

    // 3. Write vite.config.ts
    const viteConfigContent = `import { defineConfig } from 'vite';
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
});`;
    fs.writeFileSync("vite.config.ts", viteConfigContent);
    console.log('📄 Created vite.config.ts successfully!');

    // 4. Write src/main.ts
    const mainTsContent = `// This is the entry point for your game.
import * as NIXIA from '@nixia/2d';

// Hello, world!`;
    fs.writeFileSync(path.join("src", "main.ts"), mainTsContent);
    console.log('📄 Created src/main.ts successfully!');

    console.log('✅ All project components written to disk successfully!');

    console.log('📦 Updating package.json configuration...');
    const packageJsonPath = path.join("package.json");
    
    if (fs.existsSync(packageJsonPath)) {
        const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        // Safely inject scripts and type module setting
        packageData.scripts = {
            ...(packageData.scripts || {}),
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
        };
        packageData.type = "module";

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
        console.log('✨ package.json updated successfully with Vite scripts and ESM type!');
    } else {
        console.warn('⚠️ Warning: package.json not found in the current directory. Skipping script injection.');
    }

    console.log('🎉 Project scaffolding completed successfully! Happy coding! 🚀✨');
}

// Global execution wrapper with robust error catching
runCli().catch((error) => {
    console.error(`\n💥 Fatal CLI Error: ${error.message}`);
    process.exit(1);
});
    },
});`);
fs.writeFileSync("src/main.ts", `// This is the entry point for your game.\nimport * as NIXIA from '@nixia/2d';\n\n// Hello, world!`);
    console.log('✅ All components written to disk successfully!');

    console.log('📦 Updating package.json configuration...');
    const packageJsonPath = path.join("package.json");
    
    if (fs.existsSync(packageJsonPath)) {
        const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        // Safely inject scripts and type module setting
        packageData.scripts = {
            ...(packageData.scripts || {}),
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
        };
        packageData.type = "module";

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
        console.log('✨ package.json updated successfully with Vite scripts and ESM type!');
    } else {
        console.warn('⚠️ Warning: package.json not found in the current directory. Skipping script injection.');
    }

    console.log('🎉 Project scaffolding completed successfully! Happy coding! 🚀✨');
}

// Global execution wrapper with robust error catching
runCli().catch((error) => {
    console.error(`\n💥 Fatal CLI Error: ${error.message}`);
    process.exit(1);
});