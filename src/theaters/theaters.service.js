const knex = require("../db/connection");

// GET /theaters
function listTheatersAndMovies() {
	return knex("theaters as t")
		.join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
		.join("movies as m", "mt.movie_id", "m.movie_id")
		.select(
			"t.*",
			"m.*",
			"m.created_at as m_created_at",
			"m.updated_at as m_updated_at",
			"mt.is_showing",
			"mt.theater_id as m_theater_id"
		);
}

module.exports = {
	listTheatersAndMovies,
};
