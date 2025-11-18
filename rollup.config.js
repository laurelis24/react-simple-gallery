import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import crypto from 'crypto';

import packageJson from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'react-swipeable'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss({
        modules: {
          generateScopedName: (name, filename, css) => {
            const hash = crypto
              .createHash('md5')
              .update(filename + name)
              .digest('hex')
              .replace(/[/+=]/g, '')
              .slice(0, 5)
              .toLowerCase();

            return `rsg_${name.replace('-', '_')}_${hash}`;
          },
        },
        extract: 'style.css', // index.css
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: packageJson.types }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
