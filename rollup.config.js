import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import multiEntry from 'rollup-plugin-multi-entry'
import { uglify } from 'rollup-plugin-uglify'

const isProduction = process.env.BUILD === 'production'

export default {
  input: 'src/**/*.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    commonjs(),
    multiEntry(),
    babel({
      exclude: 'node_modules/**'
    }),
    isProduction ? uglify() : null
  ]
};
