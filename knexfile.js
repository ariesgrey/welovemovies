const path = require("path");

require("dotenv").config();

const {
	DATABASE_URL = "postgres://jlvfpkyc:VgG4iMP0CjASahYoiCRvPLeRVRUwzMYM@ruby.db.elephantsql.com/jlvfpkyc",
} = process.env;

module.exports = {
	development: {
		client: "postgresql",
		connection: DATABASE_URL,
		pool: { min: 0, max: 5 },
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
	},

	production: {
		client: "postgresql",
		connection: DATABASE_URL,
		pool: { min: 0, max: 5 },
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
	},

	test: {
		client: "sqlite3",
		connection: {
			filename: ":memory:",
		},
		migrations: {
			directory: path.join(__dirname, "src", "db", "migrations"),
		},
		seeds: {
			directory: path.join(__dirname, "src", "db", "seeds"),
		},
		useNullAsDefault: true,
	},
};
