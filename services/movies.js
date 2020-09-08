const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
    async getMovies() {
        const movies = await Promise.resolve(moviesMock);
        return movies || [];
    }

    async getMovie() {
        const movie = await Promise.resolve(moviesMock[0]);
        return movie || [];
    }

    async createMovies() {
        const createMovieId = await Promise.resolve(moviesMock[0].id);
        return createMovieId;
    }

    async updateMovies() {
        const updateMovieId = await Promise.resolve(moviesMock[0].id);
        return updateMovieId;
    }

    async deleteMovie() {
        const deleteMovieId = await Promise.resolve(moviesMock[0].id);
        return deleteMovieId;
    }
}

module.exports = MoviesService;