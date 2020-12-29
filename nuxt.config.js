const path = require("path");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

const PATHS = {
	root: path.resolve(__dirname, "./"),
	app: path.resolve(__dirname, "./app")
};

const pkg = require("./package");

module.exports = {
	rootDir: PATHS.root,
	srcDir: PATHS.app,
	parallel: true,
	sourcemap: false,
	cache: true,
	head: {
		title: "lavafact",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: pkg.description }
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
			}
			// { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto+Condensed:400,700,700i|Roboto:400,400i,700,700i' }
		]
	},
	env: {
		KEYSTONE_URL:
			process.env.NODE_ENV !== "production"
				? `http://localhost:${process.env.PORT}`
				: process.env.BASE_URL
	},
	transition: {
		name: "layout",
		mode: "out-in"
	},
	modules: ["@nuxtjs/axios"],
	loading: { color: "#fff" },
	css: [
		// SCSS file in the project
		"~/assets/style/index.scss"
	],
	router: {
		middleware: ["authentication"]
	},
	plugins: ["~/plugins/vuetify", { src: "~/plugins/chartist", mode: "client" }],
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},
	build: {
		splitChunks: {
			layouts: true
		},
		transpile: ["vuetify/lib"],
		plugins: [new VuetifyLoaderPlugin()],
		loaders: {},
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	},
	cssSourceMap: false
};
