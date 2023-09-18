const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation middleware
async function reviewExists(req, res, next) {
	const review = await service.read(req.params.reviewId);
	if (review) {
		res.locals.review = review;
		return next();
	}
	next({ status: 404, message: "Review cannot be found." });
}

// PUT /reviews/:reviewId
async function update(req, res) {
	const updatedReview = {
		...res.locals.review,
		...req.body.data,
		review_id: res.locals.review.review_id,
	};
	await service.update(updatedReview);
	res.json({ data: await service.updatedRead(res.locals.review.review_id) });
}

module.exports = {
	update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
