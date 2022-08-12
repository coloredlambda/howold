const { equals } = require('@meltwater/phi')
const getIpAddress = require('./util/get-ip-address')
const { addRate, RATE_LIMIT_EXCEEDED } = require('./util/rate-limiter-store')

module.exports = (req, res, next) => {
    const ip = getIpAddress(req)
    try{
        addRate(ip)
        next()
    }catch (e) {
        if(equals(e, RATE_LIMIT_EXCEEDED)){
            return res.status(429).json('RATE_LIMIT_EXCEEDED')
        }
        throw e
    }
}