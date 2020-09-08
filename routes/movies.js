const express = require('express');
const MovieService = require('../services/movies');

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    const movieService = new MovieService();

    router.get("/", async function(req, res, next) {
        const { tags } = req.query;
        try {
            const movies = await movieService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'movies ok'
            })
        } catch (error) {
            next(error);
        }
    });

    router.get("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        try {
            const movies = await movieService.getMovie({ movieId });

            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            })
        } catch (error) {
            next(error);
        }
    });

    router.post("/", async function(req, res, next) {
        const { body: movie } = req;
        try {
            const createMovieId = await movieService.createMovie({ movie });

            res.status(201).json({
                data: createMovieId,
                message: 'movies create'
            })
        } catch (error) {
            next(error);
        }
    });

    router.put("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const updateMovieId = await movieService.updateMovie({ movieId, movie });

            res.status(200).json({
                data: updateMovieId,
                message: 'movie updated'
            })
        } catch (error) {
            next(error);
        }
    });

    router.delete("/:movieId", async function(req, res, next) {
        const { movieId } = req.params;
        try {
            const deleteMovieId = await movieService.deleteMovie({ movieId });

            res.status(200).json({
                data: deleteMovieId,
                message: 'movie deleted'
            })
        } catch (error) {
            next(error);
        }
    });
}

module.exports = moviesApi;