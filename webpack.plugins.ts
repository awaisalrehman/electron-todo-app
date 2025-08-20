import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

// ✅ new import
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),

  // ✅ Copy Prisma engines + client into the .webpack build output
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.join(__dirname, 'node_modules', '.prisma', 'client'),
        to: path.join(__dirname, '.webpack', 'main', 'node_modules', '.prisma', 'client'),
        noErrorOnMissing: true,
      },
      {
        from: path.join(__dirname, 'node_modules', '@prisma', 'client'),
        to: path.join(__dirname, '.webpack', 'main', 'node_modules', '@prisma', 'client'),
        noErrorOnMissing: true,
      },
    ],
  }),
]
