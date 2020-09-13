const { config } = require('../config');

function cacheResponse(res, seconds) {
    if(!config.dev.NODE_ENV) {
        res.set('Cache-Control', `public, max-age=${seconds}`);
    }
}

module.exports = cacheResponse;