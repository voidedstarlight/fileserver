const { resolve } = require("path");
const { rspack } = require("@rspack/core");

module.exports = {
  entry: {
    main: "./src/main.ts",
  },
  experiments: {
    css: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                decorators: true,
                syntax: "typescript"
              }
            },
            sourcemap: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
						loader: "builtin:lightningcss-loader",
						options: {
							targets: ">0.5%"
						}
          }
        ],
        type: "css/auto"
      }
    ]
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./src/index.html"
    }),
    new rspack.CopyRspackPlugin({
      patterns: [{
        from: "./public"
      }]
    })
  ],
  output: {
    path: resolve(process.cwd(), "../../dist/public")
  },
  resolve: {
    extensions: [".js", ".ts", ".json"]
  }
};
