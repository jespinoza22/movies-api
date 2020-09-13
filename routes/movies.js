const express = require('express');
const MovieService = require('../services/movies');

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies", router);

    const movieService = new MovieService();

    router.get("/", async function(req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        try {
            const movies = await movieService.getMovies({ tags });
            //throw new Error('Error getting movies');

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (error) {
            next(error);
        }
    });

    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
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

    router.post("/", validationHandler(createMovieSchema), async function(req, res, next) {
        const { body: movie } = req;
        try {
            const createMovieId = await movieService.createMovie({ movie });

            res.status(201).json({
                data: createMovieId,
                message: 'movies created'
            })
        } catch (error) {
            next(error);
        }
    });

    router.put("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async function(req, res, next) {
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

    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next) {
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