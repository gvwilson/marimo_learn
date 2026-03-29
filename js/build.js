/**
 * Build script for Marimo Education Widgets
 */

import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

// Per-widget builds consumed by the Python anywidget package
const anywidgetConfig = {
  entryPoints: [
    'src/concept-map.js',
    'src/flashcard.js',
    'src/labeling.js',
    'src/matching.js',
    'src/multiple-choice.js',
    'src/ordering.js',
    'src/turtle.js'
  ],
  bundle: true,
  format: 'esm',
  outdir: '../src/marimo_learn/static',
  minify: false,
  sourcemap: true,
  logLevel: 'info',
  loader: { '.css': 'text' },
};

// Single standalone bundle for use without Python (npm / CDN)
const bundleConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/marimo-learn.js',
  minify: false,
  sourcemap: true,
  logLevel: 'info',
  loader: { '.css': 'text' },
};

async function build() {
  try {
    if (isWatch) {
      console.log('Watching for changes...');
      const [ctx1, ctx2] = await Promise.all([
        esbuild.context(anywidgetConfig),
        esbuild.context(bundleConfig),
      ]);
      await Promise.all([ctx1.watch(), ctx2.watch()]);
      console.log('Watch mode active');
    } else {
      console.log('Building JavaScript modules...');
      await Promise.all([
        esbuild.build(anywidgetConfig),
        esbuild.build(bundleConfig),
      ]);
      console.log('Build complete!');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
