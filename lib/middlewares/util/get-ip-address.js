const {pathOr, path} = require("@meltwater/phi");

module.exports = req => pathOr(
    path(['socket', 'remoteAddress'], req),
    ['headers', 'x-forwarded-for']
)(req)
