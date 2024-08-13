// rollup.config.mjs
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from "@rollup/plugin-terser";
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import pkg from './package.json' assert { type: "json" };
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import rollupPostcssLessLoader from 'rollup-plugin-postcss-webpack-alias-less-loader';
import postcssUrl from 'postcss-url';
import esbuild from 'rollup-plugin-esbuild';
import url from '@rollup/plugin-url';
import path from 'path';
// import nodePolyfills from 'rollup-plugin-node-polyfills';

// export default {
//   input: 'src/index.js',
//   output: {
//     name: pkg.name,
//     file: 'lib/bundle.js',
//     format: 'umd',
//     globals: {
//         'qs': 'qs',
//         'axios': 'axios'
//     }
//   },
//   plugins: [
//     resolve(), // so Rollup can find `ms`
//     babel({ exclude: 'node_modules/**', extensions: ['.js', '.jsx'] }), // so Rollup can transpile JSX and TS
//     commonjs(), // so Rollup can convert `ms` to an ES module
//     postcss({modules: true}),
//     image(),
//     // terser() // so Rollup can minify the output
//   ]
// };

export default {
    input: [
        './src/index.js',
    ],
    output: [{
        file: 'lib/bundle.js',
        assetFileNames: '[name]-[hash][extname]',
        exports: 'named',
        format: 'umd',
        name: '@baidu/hugegraph-analysis-react',
        externalLiveBindings: false,
        freeze: false,
        globals: {
            'react': 'React',
            'prop-types': 'PropTypes',
            'react-router-dom': 'ReactRouterDOM',
            'react-dom': 'ReactDOM',
            'axios': 'axios',
            'react-router': 'ReactRouter',
            'dayjs': 'dayjs',
            '@baidu/spui': 'BaiduSpui',
            'query-string': 'qs',
            'classnames': 'classnames',
            'vis-network': 'VisNetwork',
            'crypto-js': 'CryptoJS',
            '@antv/graphin': 'Graphin',
        }
    }],
    plugins: [
        peerDepsExternal(),
        // nodePolyfills(),
        resolve({
            browser: true,
            jsnext: true,
            main: true,
            preferBuiltins: true,
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
            skip: [
                'react',
                'react-dom',
                'prop-types',
                'react-router',
                'react-router-dom',
                // 'axios'
            ],
        }),
        url({
            fileName: '[name][extname]',
            reserveImportInJs: true
        }),
        
        esbuild({
            // All options are optional
            include: /\.[jt]sx?$/, // default, inferred from `loaders` option
            exclude: /node_modules/, // default
            sourceMap: false, // by default inferred from rollup's `output.sourcemap` option
            minify: process.env.NODE_ENV === 'production',
            target: 'es2017', // default, or 'es20XX', 'esnext'
            jsx: 'transform', // default, or 'preserve'
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            // Like @rollup/plugin-replace
            define: {
                __VERSION__: '"x.y.z"',
            },
            tsconfig: 'tsconfig.json', // default
            // Add extra loaders
            loaders: {
                // Add .json files support
                // require @rollup/plugin-commonjs
                '.json': 'json',
                // Enable JSX in .js files too
                '.js': 'jsx',
            },
        }),
        // css
        // postcss({
        //     loaders: [
        //         rollupPostcssLessLoader({
        //             nodeModulePath: path.resolve('node_modules'),
        //             aliases: {}
        //         })
        //     ],
        //     extract: path.resolve('dist/index.css'),
        //     minimize: true,
        //     use: [
        //         [
        //             'less',
        //             {
        //                 javascriptEnabled: true
        //             }
        //         ]
        //     ],
        //     plugins: [
        //         postcssUrl({
        //             url: 'inline',
        //             assetsPath: 'img',
        //             maxSize: 10, // maximum file size to inline (in kilobytes)
        //             fallback: 'copy',
        //         })
        //     ]
        // }),
        json(),
        postcss({modules: true}),
        commonjs(),
    ],
    external: [
        'react',
        'react-dom',
        'prop-types',
        'react-router',
        'react-router-dom',
    ],
}