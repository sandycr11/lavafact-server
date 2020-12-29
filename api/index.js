const keystone = require("keystone");
const fs = require("fs");
const path = require("path");
const { Nuxt, Builder } = require("nuxt");
const restful = require("restful-keystone")(keystone, {
	root: "/api/v1"
});

const config = {
	...require("../nuxt.config"),
	dev: process.env.NODE_ENV !== "production"
};

const nuxt = new Nuxt(config);

module.exports = app => {
	restful.expose({}).start();

	app.use(nuxt.render);

	if (nuxt.options.dev) {
		new Builder(nuxt).build();
	}
};
