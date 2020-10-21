
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';
import { join } from 'path';
import { Configuration } from 'webpack';

const dir = join(__dirname, '../');

const webpackConfig: Configuration = {
  context: join(dir, 'src'),
  devtool: 'source-map',
  entry: './index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        options: {
          experimentalFileCaching: true,
          transpileOnly: true,
        },
        test: /\.tsx?$/,
      },
      {
        test: /\.s?css$/,
        use: ['css-loader', {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              outputStyle: 'compressed',
            },
          },
        }],
      },
    ],
  },
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].[contenthash].js',
    path: join(dir, 'dist/frontend'),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    symlinks: false,
  },
};

// Stub types for dev server.
declare module 'webpack' {
    interface Configuration {
      devServer?: object;
    }
  }

export default function makeConfig(_env: undefined, cfg: { production?: true }) {
  console.log(cfg);
  if (!cfg.production) {
    webpackConfig.mode = 'development';
    webpackConfig.optimization!.minimize = false;
    webpackConfig.devtool = 'eval';
    webpackConfig.devServer = {
        headers: {
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
        host: 'localhost',
        port: 8082,
    };
  }
  webpackConfig.plugins!.push(new HTMLPlugin({
    filename: 'index.html',
    minify: true,
    template: 'index.ejs',
    title: 'ksjdbf.',
  }));
  return webpackConfig;
}