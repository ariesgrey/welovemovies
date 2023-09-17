if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const moviesRouter = require("./movies/movies.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use(express.json());

// Routers
app.use("/movies", moviesRouter);

// Handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
