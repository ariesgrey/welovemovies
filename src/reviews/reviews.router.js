const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId([0-9]+)").put(controller.update).all(methodNotAllowed);

module.exports = router;
