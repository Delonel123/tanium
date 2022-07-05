import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const webpackConfig = (): any => ({
  entry: "./src/index.tsx",
  ...(process.env.production || !process.env.development
    ? {}
    : { devtool: "eval-source-map" }),

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx',".css",".scss"],
    alias:{
      Assets: path.resolve(__dirname, 'src/assets'),
    },
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\\.s[ac]ss$/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader","sass-loader"],
        exclude: /\.module\\.s[ac]ss$/,
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
    }
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    // FIXME: когда корс настроют - убрать
    proxy: {
      '/api': {
        target: 'http://5.188.156.86:5047',
        pathRewrite: {
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: "./public/index.html",
    }),
    // DefinePlugin allows you to create global constants which can be configured at compile time
    new DefinePlugin({
      "process.env": process.env.production || !process.env.development,
    }),
    new ForkTsCheckerWebpackPlugin({
      // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
  ],
});

export default webpackConfig;