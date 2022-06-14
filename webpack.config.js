path = require('path');

const source_folder = 'src'
const dist_folder = 'dist';

module.exports =  {
    mode: 'development',
    target: 'node',
    entry: {
        bundle: path.resolve(__dirname, source_folder, 'index.ts')
    },
    output: {
        path: path.resolve(__dirname, dist_folder),
        filename: '[name].js',
        clean: true,
        assetModuleFilename: '[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'inline-source-map'
}