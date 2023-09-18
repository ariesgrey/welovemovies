const knex = require("../db/connection");
const addCriticKey = require("../utils/addCriticKey");

// to be used for ID validation
function read(reviewId) {
	return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

// PUT /reviews/:reviewId
function update(updatedReview) {
	return knex("reviews")
		.select("*")
		.where({ review_id: updatedReview.review_id })
		.update(updatedReview, "*");
}

// When updating a record, you will need to query the database again to return updated record.
function updatedRead(reviewId) {
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
		.where({ "r.review_id": reviewId })
		.first()
		.then(addCriticKey);
}

// DELETE /reviews/:reviewId
function destroy(reviewId) {
	return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
	read,
	update,
	updatedRead,
	destroy,
};
