// Based on the Ant Design documentation:
// https://ant.design/docs/react/use-with-create-react-app#Advanced-Guides

module.exports = {
  // babel: {
  //   plugins: [["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }]]
  // },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          const gitHubIssueUrl = (repo, query) => `https://github.com/${repo}/issues${query ? `?q=is%3Aissue+${query}` : ""}`

          const throwInvalidConfigError = ({ message, gitHubIssueQuery: query }) => {
            throw new Error(
              `${message}\n\n` +
                "Did you update create-react-app or craco recently? \n" +
                "Please take a look at some recent issues in craco and " +
                "create-react-app to see if someone has found a solution: \n\n" +
                `* ${gitHubIssueUrl("sharegate/craco", query)}\n` +
                `* ${gitHubIssueUrl("facebook/create-react-app", query)}\n`
            )
          }

          const lessExtension = /\.less$/

          const { getLoader, loaderByName } = require("@craco/craco")
          const { isFound, match: fileLoaderMatch } = getLoader(webpackConfig, loaderByName("file-loader"))
          if (!isFound) {
            throwInvalidConfigError({
              message: "Can't find file-loader in the webpack config!",
              gitHubIssueQuery: "webpack+file-loader"
            })
          }
          fileLoaderMatch.loader.exclude.push(lessExtension)

          const lessRule = {
            test: lessExtension,
            use: [
              {
                loader: require.resolve("style-loader")
              },
              {
                loader: require.resolve("css-loader")
              },
              {
                loader: require.resolve("less-loader"),
                options: {
                  additionalData: `@primary-color: #1DA57A ~'!important';
                  @link-color: #1DA57A ~'!important';
                  @border-radius-base: 2px ~'!important';
                  a:focus,
                  tr:focus,
                  td:focus {
                    border: 2px solid !important;
                    border-color: #4a21d3 !important;
                    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                    outline: 0;
                  }
                  .ant-btn:focus,
                  .ant-input:focus,
                  .ant-select:focus,
                  .ant-select-single:focus,
                  .ant-select-selector:focus,
                  .ant-select-item:focus,
                  .ant-select-show-arrow:focus,
                  .ant-checkbox-input:focus,
                  .ant-radio-input:focus {
                    border: 2px solid !important;
                    border-color: #4a21d3 !important;
                    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                    outline: 0;
                  }

                  `,
                  lessOptions: {
                    javascriptEnabled: true
                  }
                }
              }
            ]
          }

          const oneOfRule = webpackConfig.module.rules.find((rule) => typeof rule.oneOf !== "undefined")
          if (!oneOfRule) {
            throwInvalidConfigError({
              message: "Can't find a 'oneOf' rule under module.rules in the webpack config!",
              gitHubIssueQuery: "webpack+rules+oneOf"
            })
          }
          oneOfRule.oneOf.push(lessRule)

          return webpackConfig
        }
      }
    }
  ]
}
