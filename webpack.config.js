module.exports = {
  entry: {
    e5: ["./src/e5.js"]
  },
  output: {
    path: __dirname + "/_includes/dist",
    filename: "[name].js"
  },
  module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        presets: ["es2015"]
      }
    }
    ]
  }
};