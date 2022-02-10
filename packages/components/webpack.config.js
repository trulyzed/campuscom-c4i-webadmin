const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	target: "web",
	mode: "development",
	devServer: {
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	entry: {
		app: "./src/index.tsx",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
	},
	module: {
		rules: [
			// {
			// 	enforce: "pre",
			// 	test: /\.(ts|tsx)$/,
			// 	exclude: /node_modules/,
			// 	loader: "eslint-loader",
			// 	options: {
			// 		formatter: require("eslint-friendly-formatter"),
			// 		parser: "@typescript-eslint/parser",
			// 		extends: ["plugin:@typescript-eslint/recommended"],
			// 		plugins: ["@typescript-eslint"],
			// 		failOnError: false,
			// 		failOnWarning: false,
			// 		emitError: true,
			// 		emitWarning: true,
			// 		env: {
			// 			browser: true,
			// 			node: true,
			// 		},
			// 	},
			// },
			// {
			// 	test: /\.(ts|tsx)?/,
			// 	exclude: /node_modules/,
			// 	loader: "babel-loader",
			// 	options: {
			// 		presets: ["@babel/preset-typescript", "@babel/preset-react"],
			// 	},
			// },
			// {
			// 	test: /\.(ts|tsx)?/,
			// 	exclude: /node_modules/,
			// 	loader: "ts-loader",
			// 	options: {
			// 		configFile: "tsconfig.json",
			// 	},
			// },
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: "css-loader",
					},
				],
			},
			{
				test: /\.scss$/i,
				use: [
					{
						loader: "css-loader",
					},
					// {
					// 	loader: "sass-loader",
					// 	options: {
					// 		// additionalData: "@import './src/sass/global';", // it can be a function to load sass data from environment
					// 		implementation: require("sass"),
					// 		sourceMap: true,
					// 		sassOptions: {
					// 			indentWidth: 2,
					// 			outputStyle: "compressed",
					// 		},
					// 	},
					// },
				],
				// exclude: path.resolve(__dirname, "src/sass/global/*"),
			},
		],
	},
	plugins: [new CleanWebpackPlugin()],
	// externals: ["react", "react-dom", "focus-trap-react", "focus-trap"],
	resolve: {
		// alias: {
		// 	"~": path.resolve(__dirname, "src"),
		// },
		// modules: [path.resolve(__dirname, "src"), "node_modules"],
		extensions: [".ts", ".tsx", ".js"],
	},
};
