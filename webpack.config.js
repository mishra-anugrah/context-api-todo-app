const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: { util: false },
  },
  devServer: { contentBase: path.join(__dirname, "src") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// module.exports = {
//   mode: "development",
//   entry: "./src/index.tsx",
//   devtool: "inline-source-map",
//   output: {
//     path: path.join(__dirname, "/dist"),
//     filename: "bundle.js",
//   },
//   devServer: {
//     static: "./dist",
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".jsx", ".ts", ".js"],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//     }),
//   ],
// };

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   output: {
//     path: path.join(__dirname, "/dist"), // the bundle output path
//     filename: "bundle.js", // the name of the bundle
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "src/index.html", // to import index.html file inside index.js
//     }),
//   ],
//   devServer: {
//     port: 3030, // you can change the port
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/, // .js and .jsx files
//         exclude: /node_modules/, // excluding the node_modules folder
//         use: {
//           loader: "babel-loader",
//         },
//       },
//       {
//         test: /\.(sa|sc|c)ss$/, // styles files
//         use: ["style-loader", "css-loader", "sass-loader"],
//       },
//       {
//         test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
//         loader: "url-loader",
//         options: { limit: false },
//       },
//     ],
//   },
// };
