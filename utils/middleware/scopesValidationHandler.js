const boom = require('@hapi/boom');

function scopesValidationHandler(allowedScopes){
    return function(req, res, next) {
        if (!req.user || (req.user && !req.user.scopes)) {
            next(boom.unauthorized('Missing scopes'));
        }

        const hasAccsess = allowedScopes.map(allowedScope => req.user.scopes.includes(allowedScope))
        .find(allowed => Boolean(allowed));

        if(hasAccsess) {
            next();
        } else {
            next(boom.unauthorized('Insuficient scopes'));
        }
    }
}

module.exports = scopesValidationHandler;