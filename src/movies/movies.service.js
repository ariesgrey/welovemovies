const knex = require("../db/connection");
const addCriticKey = require("../utils/addCriticKey");

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

// GET /movies/:movieId/reviews
function readReviews(movieId) {
	return knex("reviews as r")
		.join("critics as c", "r.critic_id", "c.critic_id")
		.select(
			"r.*",
			"c.critic_id as c_critic_id",
			"c.preferred_name",
			"c.surname",
			"c.organization_name",
			"c.created_at as c_created_at",
			"c.updated_at as c_updated_at"
		)
		.where({ "r.movie_id": movieId })
		.then((reviews) => reviews.map((review) => addCriticKey(review)));
}

module.exports = {
	list,
	listIsShowing,
	read,
	readTheaters,
	readReviews,
};
