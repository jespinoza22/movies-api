const express = require('express');
const app = express();
// const cors = require('cors');
const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const userMoviesApi = require('./routes/userMovies.js')

const {
    logErrors,
    wrapError,
    errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

//body parser
app.use(express.json());

// routes
moviesApi(app);
userMoviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

// app.use(cors()); //Cors for all request
/*
const corsOptions = { origin: "http://example.com" };

app.use(cors(corsOptions));*/ // Cors for some domains

app.listen(config.port, function() {
    console.log(`Listening http:localhost:${config.port}`)
});