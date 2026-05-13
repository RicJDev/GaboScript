import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const config = {
    entryPoints: ['src/extension.ts'],
    outfile: 'out/extension.js',
    bundle: true,
    external: ['vscode'],
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    minify: false,
};

if (isWatch) {
    const ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('[esbuild] watching for changes...');
} else {
    await esbuild.build(config);
    console.log('[esbuild] build complete → out/extension.js');
}
