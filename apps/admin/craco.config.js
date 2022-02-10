/* craco.config.js */
const path = require("path")
const lessConfig = require("./less.config")
module.exports = function ({ env }) {
  return {
    babel: {
      ...lessConfig.babel
    },
    plugins: [...lessConfig.plugins],
    eslint: {
      enable: false
    },
    webpack: {
      alias: {
        "~": path.resolve(__dirname, "src")
      }
    },
    jest: {
      configure: {
        moduleNameMapper: {
          "^~(.*)$": "<rootDir>/src/$1"
        }
      }
    }
  }
}
