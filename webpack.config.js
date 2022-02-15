// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),

    new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets/like.png",
          to: "./assets/like.png",
        },
        {
          from: "./src/assets/dislike.png",
          to: "./assets/dislike.png",
        },
        {
          from: "./src/assets/playButton.svg",
          to: "./assets/playButton.svg",
        },
        {
          from: "./src/assets/fig3.png",
          to: "./assets/fig3.png",
        },
        {
          from: "./src/assets/fig2.png",
          to: "./assets/fig2.png",
        },
        {
          from: "./src/assets/fig1.png",
          to: "./assets/fig1.png",
        },
        {
          from: "./src/assets/adv-title.png",
          to: "./assets/adv-title.png",
        },
        {
          from: "./src/assets/greeting.png",
          to: "./assets/greeting.png",
        },
        {
          from: "./src/assets/team-title-back.png",
          to: "./assets/team-title-back.png",
        },
        {
          from: "./src/assets/sprint.png",
          to: "./assets/sprint.png",
        },
        {
          from: "./src/assets/RS-Lang.svg",
          to: "./assets/RS-Lang.svg",
        },
        {
          from: "./src/assets/audio-call.png",
          to: "./assets/audio-call.png",
        },
        {
          from: "./src/assets/pasha.png",
          to: "./assets/pasha.png",
        },
        {
          from: "./src/assets/oleg.jpg",
          to: "./assets/oleg.jpg",
        },
        {
          from: "./src/assets/ivan.jpg",
          to: "./assets/ivan.jpg",
        },
        {
          from: "./src/assets/GitHub-icon.png",
          to: "./assets/GitHub-icon.png",
        },
        {
          from: "./src/assets/favicon.png",
          to: "./assets/favicon.png",
        },
        {
          from: "./src/assets/audio/correct-sound.mp3",
          to: "./assets/correct-sound.mp3",
        },
        {
          from: "./src/assets/audio/wrong-sound.mp3",
          to: "./assets/wrong-sound.mp3",
        },
      ],
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.json$/i,
        type: "asset/resource",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
