const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
	let data;
	const query = req.query.is_showing;
	query
		? (data = await service.listIsShowing())
		: (data = await service.list());
	res.json({ data });
}

module.exports = {
	list: asyncErrorBoundary(list),
};
