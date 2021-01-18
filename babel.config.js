module.exports = {
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    "@babel/preset-react",
  ],
  ignore: ["node_modules/**"],
  exclude: /node_modules/,
  plugins: [],
};
