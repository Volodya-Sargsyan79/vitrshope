const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader",],
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        type: 'asset/resource'
      }
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV : JSON.stringify('production')
    }),
  ],
};