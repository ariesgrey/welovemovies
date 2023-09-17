const knex = require("../db/connection");

// GET /movies
function list() {
	return knex("movies").select("*");
}

// GET /movies?is_showing=true
function listIsShowing() {
	return knex("movies as m")
		.join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
		.select("m.*")
		.distinct()
		.where({ "mt.is_showing": true });
}

// GET /movies/:movieId
function read(movieId) {
	return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
	list,
	listIsShowing,
	read,
};
