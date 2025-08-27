import type { Configuration } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from 'path';

// Extend rules for CSS
const rendererRules = [
  ...rules,
  {
    test: /\.css$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
  },
];

export const rendererConfig: Configuration = {
  devtool: 'inline-source-map', // safer for CSP
  module: { rules: rendererRules },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
      }),
    ],
  },
};
