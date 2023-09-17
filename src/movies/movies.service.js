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

// GET /movies/:movieId/theaters
function readTheaters(movieId) {
	return knex("theaters as t")
		.join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
		.select("t.*", "mt.is_showing", "mt.movie_id")
		.where({ "mt.movie_id": movieId });
}

module.exports = {
	list,
	listIsShowing,
	read,
	readTheaters,
};
