const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation middleware
async function movieExists(req, res, next) {
	const movie = await service.read(req.params.movieId);
	if (movie) {
		res.locals.movie = movie;
		return next();
	}
	next({ status: 404, message: "Movie cannot be found." });
}

// GET /movies + /movies?is_showing=true
async function list(req, res) {
	let data;
	const query = req.query.is_showing;
	query
		? (data = await service.listIsShowing())
		: (data = await service.list());
	res.json({ data });
}

// GET /movies/:movieId
function read(req, res) {
	const { movie: data } = res.locals;
	res.json({ data });
}

module.exports = {
	list: asyncErrorBoundary(list),
	read: [asyncErrorBoundary(movieExists), read],
};
