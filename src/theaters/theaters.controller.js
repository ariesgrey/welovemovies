const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

// GET /theaters
const reduceMovies = reduceProperties("theater_id", {
	movie_id: ["movies", null, "movie_id"],
	title: ["movies", null, "title"],
	runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
	rating: ["movies", null, "rating"],
	description: ["movies", null, "description"],
	image_url: ["movies", null, "image_url"],
	m_created_at: ["movies", null, "created_at"],
	m_updated_at: ["movies", null, "updated_at"],
	is_showing: ["movies", null, "is_showing"],
	m_theater_id: ["movies", null, "theater_id"],
});

async function list(req, res) {
	const theatersAndMovies = await service.listTheatersAndMovies();
	res.json({ data: reduceMovies(theatersAndMovies) });
}

module.exports = {
	list: asyncErrorBoundary(list),
};
