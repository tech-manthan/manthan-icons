import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/all.ts'],
  format: ['esm'],
  dts: true,
  clean: false,
  treeshake: true,
  target: 'es2022',
});
