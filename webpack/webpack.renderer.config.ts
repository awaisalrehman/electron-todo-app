import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

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
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
