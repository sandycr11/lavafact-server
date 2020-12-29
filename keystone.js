require("dotenv").config();

const keystone = require("keystone");
const { sluggify } = require("./utils");

keystone.init({
	name: "lavafact",
	brand: "lavafact",
	mongo: process.env.MONGO_URI,

	// static: ["node_modules"],

	session: true,
	"session store": "connect-mongo",
	"session store options": { cookie: { maxAge: 36000000 } },

	"cookie secret": process.env.COOKIE_SECRET,
	"auto update": process.env.AUTO_UPDATE !== "false",
	port: process.env.PORT || 3000,
	auth: true,
	"user model": "User",

	"trust proxy": true
});

keystone.import("api/models");

keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set("routes", require("./api"));

keystone.set("nav", {
	users: "users"
});

keystone.start();
