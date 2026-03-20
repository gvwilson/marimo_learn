/**
 * Build script for Marimo Education Widgets
 */

import * as esbuild from 'esbuild';

const isWatch = process.argv.includes('--watch');

const buildConfig = {
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
  loader: {
    '.css': 'text'
  },
};

async function build() {
  try {
    if (isWatch) {
      console.log('Watching for changes...');
      const context = await esbuild.context(buildConfig);
      await context.watch();
      console.log('Watch mode active');
    } else {
      console.log('Building JavaScript modules...');
      await esbuild.build(buildConfig);
      console.log('Build complete!');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
